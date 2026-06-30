from rest_framework import serializers

from reviews.models import Review

from .models import FacultyProfile


class PublicMentorReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_initials = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "title",
            "comment",
            "student_name",
            "student_initials",
            "published_at",
        ]

    def get_student_name(self, obj):
        name = obj.student.get_full_name().strip()
        return name or obj.student.username.split("@")[0].replace(".", " ").title()

    def get_student_initials(self, obj):
        return "".join(
            part[0] for part in self.get_student_name(obj).split()[:2]
        ).upper()


class PublicFacultyProfileListSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()

    class Meta:
        model = FacultyProfile
        fields = [
            "id",
            "display_name",
            "slug",
            "headline",
            "avatar",
            "expertise",
            "job_title",
            "company",
            "location",
            "languages",
            "availability",
            "years_experience",
            "students_mentored",
            "sessions_completed",
            "is_verified",
            "is_featured",
            "average_rating",
            "review_count",
        ]

    def get_average_rating(self, obj):
        return round(getattr(obj, "average_rating", None) or 0, 1)

    def get_review_count(self, obj):
        return getattr(obj, "review_count", 0) or 0


class PublicFacultyProfileDetailSerializer(PublicFacultyProfileListSerializer):
    reviews = serializers.SerializerMethodField()

    class Meta(PublicFacultyProfileListSerializer.Meta):
        fields = PublicFacultyProfileListSerializer.Meta.fields + [
            "bio",
            "experience",
            "achievements",
            "linkedin_url",
            "github_url",
            "website_url",
            "booking_url",
            "session_duration_minutes",
            "session_price_paise",
            "reviews",
        ]

    def get_reviews(self, obj):
        reviews = obj.reviews.published().select_related("student")[:6]
        return PublicMentorReviewSerializer(reviews, many=True).data


class PublicFacultyProfileSerializer(PublicFacultyProfileListSerializer):
    """Backward-compatible nested instructor serializer used by course APIs."""

    class Meta(PublicFacultyProfileListSerializer.Meta):
        fields = PublicFacultyProfileListSerializer.Meta.fields + [
            "bio",
            "linkedin_url",
            "github_url",
            "website_url",
        ]
