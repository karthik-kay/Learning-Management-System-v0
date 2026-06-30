from django.db.models import Avg, Count, Q
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import FacultyProfile
from .serializers import (
    PublicFacultyProfileDetailSerializer,
    PublicFacultyProfileListSerializer,
)


def public_faculty_queryset():
    return (
        FacultyProfile.objects.filter(is_public=True)
        .select_related("user")
        .annotate(
            average_rating=Avg(
                "reviews__rating",
                filter=Q(reviews__status="published"),
            ),
            review_count=Count(
                "reviews",
                filter=Q(reviews__status="published"),
                distinct=True,
            ),
        )
    )


class PublicFacultyProfileListAPIView(generics.ListAPIView):
    serializer_class = PublicFacultyProfileListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = public_faculty_queryset()
        params = self.request.query_params
        search = params.get("search")
        expertise = params.get("expertise")
        availability = params.get("availability")
        featured = params.get("featured")

        if search:
            queryset = queryset.filter(
                Q(display_name__icontains=search)
                | Q(headline__icontains=search)
                | Q(job_title__icontains=search)
                | Q(company__icontains=search)
                | Q(expertise__icontains=search)
            )
        if expertise:
            queryset = queryset.filter(expertise__contains=[expertise])
        if availability:
            queryset = queryset.filter(availability=availability)
        if featured == "true":
            queryset = queryset.filter(is_featured=True)

        return queryset


class PublicFacultyProfileDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PublicFacultyProfileDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return public_faculty_queryset()
