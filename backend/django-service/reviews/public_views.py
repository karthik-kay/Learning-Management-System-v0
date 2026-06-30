from collections import Counter

from django.contrib.contenttypes.models import ContentType
from django.db.models import Avg, Count
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Review
from .serializers import PublicReviewSerializer


TARGET_KIND_TO_MODEL = {
    "course": ("courses", "course"),
    "course_product": ("courses", "courseproduct"),
    "program": ("programs", "learningprogram"),
}


def published_reviews():
    learning_content_types = [
        ContentType.objects.get_by_natural_key(app_label, model)
        for app_label, model in TARGET_KIND_TO_MODEL.values()
    ]
    return (
        Review.objects.published()
        .filter(content_type__in=learning_content_types)
        .select_related("student", "content_type")
        .prefetch_related("target")
    )


def apply_review_filters(queryset, params):
    target_key = params.get("target")
    rating = params.get("rating")

    if target_key and ":" in target_key:
        kind, raw_id = target_key.split(":", 1)
        model_label = TARGET_KIND_TO_MODEL.get(kind)
        if model_label and raw_id.isdigit():
            content_type = ContentType.objects.get_by_natural_key(*model_label)
            queryset = queryset.filter(
                content_type=content_type,
                object_id=int(raw_id),
            )

    if rating and rating.isdigit() and 1 <= int(rating) <= 5:
        queryset = queryset.filter(rating=int(rating))

    sort = params.get("sort", "helpful")
    ordering = {
        "helpful": ("-helpful_count", "-created_at"),
        "recent": ("-published_at", "-created_at"),
        "highest": ("-rating", "-helpful_count", "-created_at"),
    }.get(sort, ("-helpful_count", "-created_at"))

    return queryset.order_by(*ordering)


class PublicReviewPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = "page_size"
    max_page_size = 24

    def get_paginated_response(self, data):
        return Response(
            {
                "count": self.page.paginator.count,
                "page": self.page.number,
                "page_size": self.get_page_size(self.request),
                "total_pages": self.page.paginator.num_pages,
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "results": data,
            }
        )


class PublicReviewListAPIView(generics.ListAPIView):
    serializer_class = PublicReviewSerializer
    permission_classes = [AllowAny]
    pagination_class = PublicReviewPagination

    def get_queryset(self):
        queryset = published_reviews()
        featured = self.request.query_params.get("featured")
        if featured == "true":
            queryset = queryset.filter(is_featured=True)
        elif self.request.query_params.get("exclude_featured") == "true":
            queryset = queryset.filter(is_featured=False)
        return apply_review_filters(queryset, self.request.query_params)


class PublicReviewSummaryAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = published_reviews()
        aggregates = queryset.aggregate(
            average_rating=Avg("rating"),
            total_reviews=Count("id"),
        )
        total_reviews = aggregates["total_reviews"] or 0

        rating_counts = {
            row["rating"]: row["count"]
            for row in queryset.values("rating").annotate(count=Count("id"))
        }
        breakdown = [
            {
                "rating": rating,
                "count": rating_counts.get(rating, 0),
                "percentage": round(
                    rating_counts.get(rating, 0) * 100 / total_reviews
                )
                if total_reviews
                else 0,
            }
            for rating in range(5, 0, -1)
        ]

        sentiments = Counter()
        targets = {}
        serializer = PublicReviewSerializer()
        for review in queryset:
            sentiments.update(
                item.strip()
                for item in review.sentiments
                if isinstance(item, str) and item.strip()
            )
            target = serializer.get_target(review)
            targets[target["key"]] = target

        return Response(
            {
                "average_rating": round(aggregates["average_rating"] or 0, 1),
                "total_reviews": total_reviews,
                "verified_reviews": queryset.filter(is_verified=True).count(),
                "featured_reviews": queryset.filter(is_featured=True).count(),
                "breakdown": breakdown,
                "sentiments": [
                    {"label": label, "count": count}
                    for label, count in sentiments.most_common(8)
                ],
                "targets": sorted(
                    targets.values(),
                    key=lambda target: (target["kind"], target["name"]),
                ),
            }
        )
