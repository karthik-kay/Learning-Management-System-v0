from django.contrib import admin
from django.utils import timezone

from .models import (
    FeedbackAnswer,
    FeedbackQuestion,
    FeedbackSubmission,
    Review,
)


@admin.action(description="Publish selected reviews")
def publish_reviews(modeladmin, request, queryset):
    queryset.update(status=Review.Status.PUBLISHED, published_at=timezone.now())


@admin.action(description="Archive selected reviews")
def archive_reviews(modeladmin, request, queryset):
    queryset.update(status=Review.Status.ARCHIVED, published_at=None)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = (
        "target_name",
        "student",
        "rating",
        "status",
        "is_verified",
        "is_featured",
        "helpful_count",
        "created_at",
    )
    list_filter = (
        "status",
        "rating",
        "is_verified",
        "is_featured",
        "content_type",
    )
    search_fields = (
        "student__username",
        "student__first_name",
        "student__last_name",
        "title",
        "comment",
    )
    readonly_fields = ("created_at", "updated_at", "published_at")
    ordering = ("-is_featured", "-helpful_count", "-created_at")
    actions = (publish_reviews, archive_reviews)


class FeedbackAnswerInline(admin.TabularInline):
    model = FeedbackAnswer
    extra = 0
    readonly_fields = ("created_at", "updated_at")


@admin.register(FeedbackSubmission)
class FeedbackSubmissionAdmin(admin.ModelAdmin):
    list_display = (
        "target_name",
        "kind",
        "student_display_name",
        "overall_rating",
        "status",
        "visibility",
        "created_at",
    )
    list_filter = (
        "kind",
        "status",
        "visibility",
        "is_anonymous",
        "content_type",
    )
    search_fields = ("student__username", "comment")
    readonly_fields = ("created_at", "updated_at", "reviewed_at")
    ordering = ("-created_at",)
    inlines = (FeedbackAnswerInline,)


@admin.register(FeedbackQuestion)
class FeedbackQuestionAdmin(admin.ModelAdmin):
    list_display = (
        "prompt",
        "feedback_kind",
        "response_type",
        "is_required",
        "is_active",
        "display_order",
    )
    list_filter = ("feedback_kind", "response_type", "is_required", "is_active")
    search_fields = ("prompt", "help_text", "dimension_key")
    ordering = ("feedback_kind", "display_order", "id")


@admin.register(FeedbackAnswer)
class FeedbackAnswerAdmin(admin.ModelAdmin):
    list_display = ("submission", "question", "created_at")
    list_filter = ("question__feedback_kind", "question__response_type")
    search_fields = ("text_value", "submission__student__username")
    readonly_fields = ("created_at", "updated_at")
