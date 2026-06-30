from django.db.models import Avg, Q
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from certifications.models import CertificationOffering
from courses.models import CourseProduct
from faculty.models import FacultyProfile
from programs.models import LearningProgram

from public_content.models import (
    BlogCategory,
    BlogPost,
    CareerPath,
    FAQ,
    PublicDomain,
    PublicEvent,
    PublicPage,
    Roadmap,
    SuccessStory,
)
from public_content.serializers import (
    BlogCategorySerializer,
    BlogPostDetailSerializer,
    BlogPostListSerializer,
    CareerPathDetailSerializer,
    CareerPathListSerializer,
    FAQSerializer,
    PublicDomainSerializer,
    PublicEventDetailSerializer,
    PublicEventListSerializer,
    PublicPageSerializer,
    RoadmapDetailSerializer,
    RoadmapListSerializer,
    SuccessStoryDetailSerializer,
    SuccessStoryListSerializer,
)


PUBLISHED = "published"


class PublicPageDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PublicPageSerializer
    permission_classes = [AllowAny]
    lookup_field = "page_key"

    def get_queryset(self):
        return (
            PublicPage.objects.filter(status=PUBLISHED)
            .prefetch_related("blocks", "faqs")
        )


class FAQListAPIView(generics.ListAPIView):
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = FAQ.objects.filter(status=PUBLISHED).select_related("page")
        params = self.request.query_params

        page_key = params.get("page")
        category = params.get("category")
        search = params.get("search")

        if page_key:
            qs = qs.filter(page__page_key=page_key)

        if category:
            qs = qs.filter(category__iexact=category)

        if search:
            qs = qs.filter(Q(question__icontains=search) | Q(answer__icontains=search))

        return qs


class BlogCategoryListAPIView(generics.ListAPIView):
    serializer_class = BlogCategorySerializer
    permission_classes = [AllowAny]
    queryset = BlogCategory.objects.all()


class BlogPostListAPIView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = BlogPost.objects.filter(status=PUBLISHED).select_related("category")
        params = self.request.query_params

        search = params.get("search")
        category = params.get("category")
        featured = params.get("featured")
        tag = params.get("tag")

        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(excerpt__icontains=search)
                | Q(body__icontains=search)
            )

        if category:
            qs = qs.filter(category__slug=category)

        if featured == "true":
            qs = qs.filter(is_featured=True)

        if tag:
            qs = qs.filter(tags__contains=[tag])

        return qs


class BlogPostDetailAPIView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return BlogPost.objects.filter(status=PUBLISHED).select_related("category")


class SuccessStoryPagination(PageNumberPagination):
    page_size = 6
    page_size_query_param = "page_size"
    max_page_size = 12


class SuccessStoryListAPIView(generics.ListAPIView):
    serializer_class = SuccessStoryListSerializer
    permission_classes = [AllowAny]
    pagination_class = SuccessStoryPagination

    def get_queryset(self):
        queryset = SuccessStory.objects.filter(status=PUBLISHED).select_related(
            "related_program"
        )
        params = self.request.query_params

        track = params.get("track")
        background = params.get("background")
        outcome = params.get("outcome")
        featured = params.get("featured")

        if track:
            queryset = queryset.filter(track=track)
        if background:
            queryset = queryset.filter(background=background)
        if outcome:
            queryset = queryset.filter(outcome_type=outcome)
        if featured == "true":
            queryset = queryset.filter(is_featured=True)

        return queryset


class SuccessStoryDetailAPIView(generics.RetrieveAPIView):
    serializer_class = SuccessStoryDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return SuccessStory.objects.filter(status=PUBLISHED).select_related(
            "related_program"
        )


class SuccessStorySummaryAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = SuccessStory.objects.filter(status=PUBLISHED)
        aggregate = queryset.aggregate(
            average_salary_jump=Avg(
                "salary_jump_percent", filter=Q(salary_jump_percent__gt=0)
            ),
            average_time_to_hire=Avg("time_to_hire_months"),
        )
        return Response(
            {
                "total_placed": queryset.filter(is_placed=True).count(),
                "average_salary_jump_percent": round(
                    aggregate["average_salary_jump"] or 0
                ),
                "average_time_to_hire_months": round(
                    aggregate["average_time_to_hire"] or 0, 1
                ),
                "total_stories": queryset.count(),
            }
        )


class SuccessStoryFiltersAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        queryset = SuccessStory.objects.filter(status=PUBLISHED)
        return Response(
            {
                "tracks": sorted(
                    queryset.order_by().values_list("track", flat=True).distinct()
                ),
                "backgrounds": sorted(
                    queryset.order_by()
                    .values_list("background", flat=True)
                    .distinct()
                ),
                "outcomes": sorted(
                    queryset.order_by()
                    .values_list("outcome_type", flat=True)
                    .distinct()
                ),
            }
        )


class UniversalSearchAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        query = request.query_params.get("q", "").strip()
        requested_kind = request.query_params.get("type", "").strip()
        try:
            limit = min(max(int(request.query_params.get("limit", 8)), 1), 20)
        except ValueError:
            limit = 8

        if len(query) < 2:
            return Response(
                {
                    "query": query,
                    "count": 0,
                    "category_counts": {},
                    "results": [],
                }
            )

        sources = {
            "program": (
                LearningProgram.objects.filter(is_published=True).filter(
                    Q(title__icontains=query)
                    | Q(subtitle__icontains=query)
                    | Q(short_description__icontains=query)
                    | Q(description__icontains=query)
                ),
                lambda item: {
                    "id": f"program-{item.pk}",
                    "type": "program",
                    "type_label": "Program",
                    "title": item.title,
                    "description": item.short_description or item.subtitle,
                    "url": f"/programs/{item.slug}",
                    "meta": item.get_level_display(),
                    "is_featured": item.is_featured,
                },
            ),
            "course": (
                CourseProduct.objects.filter(is_published=True).filter(
                    Q(title__icontains=query)
                    | Q(short_description__icontains=query)
                    | Q(course__description__icontains=query)
                    | Q(course__domain__icontains=query)
                ),
                lambda item: {
                    "id": f"course-{item.pk}",
                    "type": "course",
                    "type_label": "Course",
                    "title": item.title,
                    "description": item.short_description,
                    "url": f"/courses/{item.course_id}",
                    "meta": item.course.domain or "Course",
                    "is_featured": item.is_featured,
                },
            ),
            "mentor": (
                FacultyProfile.objects.filter(is_public=True).filter(
                    Q(display_name__icontains=query)
                    | Q(headline__icontains=query)
                    | Q(bio__icontains=query)
                    | Q(job_title__icontains=query)
                    | Q(company__icontains=query)
                ),
                lambda item: {
                    "id": f"mentor-{item.pk}",
                    "type": "mentor",
                    "type_label": "Mentor",
                    "title": item.display_name,
                    "description": item.headline or item.bio,
                    "url": f"/mentors/{item.slug}",
                    "meta": item.company or item.job_title,
                    "is_featured": item.is_featured,
                },
            ),
            "certification": (
                CertificationOffering.objects.filter(is_active=True).filter(
                    Q(title__icontains=query)
                    | Q(short_description__icontains=query)
                    | Q(description__icontains=query)
                    | Q(level__icontains=query)
                ),
                lambda item: {
                    "id": f"certification-{item.pk}",
                    "type": "certification",
                    "type_label": "Certification",
                    "title": item.title,
                    "description": item.short_description,
                    "url": f"/certifications/{item.slug}",
                    "meta": item.get_domain_display(),
                    "is_featured": item.is_featured,
                },
            ),
            "blog": (
                BlogPost.objects.filter(status=PUBLISHED).filter(
                    Q(title__icontains=query)
                    | Q(excerpt__icontains=query)
                    | Q(body__icontains=query)
                    | Q(author_name__icontains=query)
                ),
                lambda item: {
                    "id": f"blog-{item.pk}",
                    "type": "blog",
                    "type_label": "Article",
                    "title": item.title,
                    "description": item.excerpt,
                    "url": f"/blog/{item.slug}",
                    "meta": item.author_name or "LearnerSlate",
                    "is_featured": item.is_featured,
                },
            ),
            "event": (
                PublicEvent.objects.filter(status=PUBLISHED).filter(
                    Q(title__icontains=query)
                    | Q(short_description__icontains=query)
                    | Q(description__icontains=query)
                    | Q(mentor_name__icontains=query)
                ),
                lambda item: {
                    "id": f"event-{item.pk}",
                    "type": "event",
                    "type_label": "Event",
                    "title": item.title,
                    "description": item.short_description,
                    "url": f"/events/{item.slug}",
                    "meta": item.get_event_type_display(),
                    "is_featured": item.is_featured,
                },
            ),
            "career": (
                CareerPath.objects.filter(status=PUBLISHED).filter(
                    Q(title__icontains=query)
                    | Q(subtitle__icontains=query)
                    | Q(short_description__icontains=query)
                    | Q(description__icontains=query)
                    | Q(role_family__icontains=query)
                ),
                lambda item: {
                    "id": f"career-{item.pk}",
                    "type": "career",
                    "type_label": "Career path",
                    "title": item.title,
                    "description": item.short_description or item.subtitle,
                    "url": f"/career-path/{item.slug}",
                    "meta": item.role_family or item.get_level_display(),
                    "is_featured": item.is_featured,
                },
            ),
            "roadmap": (
                Roadmap.objects.filter(status=PUBLISHED).filter(
                    Q(title__icontains=query)
                    | Q(subtitle__icontains=query)
                    | Q(description__icontains=query)
                ),
                lambda item: {
                    "id": f"roadmap-{item.pk}",
                    "type": "roadmap",
                    "type_label": "Roadmap",
                    "title": item.title,
                    "description": item.description or item.subtitle,
                    "url": f"/roadmaps/{item.slug}",
                    "meta": item.get_level_display(),
                    "is_featured": item.is_featured,
                },
            ),
            "story": (
                SuccessStory.objects.filter(status=PUBLISHED).filter(
                    Q(student_name__icontains=query)
                    | Q(headline__icontains=query)
                    | Q(hook__icontains=query)
                    | Q(track__icontains=query)
                    | Q(after_title__icontains=query)
                    | Q(company_name__icontains=query)
                ),
                lambda item: {
                    "id": f"story-{item.pk}",
                    "type": "story",
                    "type_label": "Success story",
                    "title": item.headline,
                    "description": item.hook,
                    "url": f"/success-stories/{item.slug}",
                    "meta": item.student_name,
                    "is_featured": item.is_featured,
                },
            ),
        }

        if requested_kind and requested_kind in sources:
            sources = {requested_kind: sources[requested_kind]}

        results = []
        category_counts = {}
        for kind, (queryset, mapper) in sources.items():
            category_counts[kind] = queryset.count()
            results.extend(map(mapper, queryset[:limit]))

        lowered_query = query.lower()
        results.sort(
            key=lambda item: (
                not item["title"].lower().startswith(lowered_query),
                not item["is_featured"],
                item["title"].lower(),
            )
        )

        return Response(
            {
                "query": query,
                "count": sum(category_counts.values()),
                "category_counts": category_counts,
                "results": results[:limit] if not requested_kind else results,
            }
        )


class PublicDomainListAPIView(generics.ListAPIView):
    serializer_class = PublicDomainSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = PublicDomain.objects.filter(status=PUBLISHED)
        featured = self.request.query_params.get("featured")

        if featured == "true":
            qs = qs.filter(is_featured=True)

        return qs


class CareerPathListAPIView(generics.ListAPIView):
    serializer_class = CareerPathListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = (
            CareerPath.objects.filter(status=PUBLISHED)
            .select_related("domain")
            .prefetch_related("stages", "related_roadmaps")
        )
        params = self.request.query_params

        search = params.get("search")
        domain = params.get("domain")
        level = params.get("level")
        featured = params.get("featured")

        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(subtitle__icontains=search)
                | Q(short_description__icontains=search)
                | Q(description__icontains=search)
                | Q(skills__contains=[search])
                | Q(tools__contains=[search])
            )

        if domain:
            qs = qs.filter(domain__slug=domain)

        if level:
            qs = qs.filter(level=level)

        if featured == "true":
            qs = qs.filter(is_featured=True)

        return qs


class CareerPathDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CareerPathDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            CareerPath.objects.filter(status=PUBLISHED)
            .select_related("domain")
            .prefetch_related(
                "stages",
                "recommended_programs",
                "recommended_courses",
                "related_roadmaps__domain",
            )
        )


class RoadmapListAPIView(generics.ListAPIView):
    serializer_class = RoadmapListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = (
            Roadmap.objects.filter(status=PUBLISHED)
            .select_related("domain")
            .prefetch_related("steps", "tracks")
        )
        params = self.request.query_params

        search = params.get("search")
        domain = params.get("domain")
        level = params.get("level")
        career_path = params.get("career_path")
        featured = params.get("featured")

        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(subtitle__icontains=search)
                | Q(description__icontains=search)
            )

        if domain:
            qs = qs.filter(domain__slug=domain)

        if level:
            qs = qs.filter(level=level)

        if career_path:
            qs = qs.filter(related_career_paths__slug=career_path)

        if featured == "true":
            qs = qs.filter(is_featured=True)

        return qs


class RoadmapDetailAPIView(generics.RetrieveAPIView):
    serializer_class = RoadmapDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Roadmap.objects.filter(status=PUBLISHED)
            .select_related("domain")
            .prefetch_related(
                "steps",
                "tracks__steps",
                "related_career_paths__domain",
                "recommended_programs",
                "recommended_courses",
            )
        )


class PublicEventListAPIView(generics.ListAPIView):
    serializer_class = PublicEventListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = PublicEvent.objects.filter(status=PUBLISHED)
        params = self.request.query_params

        search = params.get("search")
        event_type = params.get("event_type")
        featured = params.get("featured")

        if search:
            qs = qs.filter(
                Q(title__icontains=search)
                | Q(short_description__icontains=search)
                | Q(description__icontains=search)
                | Q(mentor_name__icontains=search)
            )

        if event_type:
            qs = qs.filter(event_type=event_type)

        if featured == "true":
            qs = qs.filter(is_featured=True)

        return qs


class PublicEventDetailAPIView(generics.RetrieveAPIView):
    serializer_class = PublicEventDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return (
            PublicEvent.objects.filter(status=PUBLISHED)
            .prefetch_related(
                "related_programs",
                "related_courses",
            )
        )
