from django.conf import settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone


RATING_VALIDATORS = [MinValueValidator(1), MaxValueValidator(5)]

PUBLIC_REVIEW_TARGETS = {
    "courses.course",
    "courses.courseproduct",
    "faculty.facultyprofile",
    "programs.learningprogram",
}

FEEDBACK_TARGETS = {
    *PUBLIC_REVIEW_TARGETS,
    "courses.module",
    "courses.lesson",
    "live_classes.liveclass",
    "institution.academicbatch",
}

FEEDBACK_DIMENSIONS = {
    "teaching",
    "content",
    "difficulty",
    "support",
    "pace",
    "projects",
    "platform",
}


def content_type_label(content_type):
    if not content_type:
        return ""
    return f"{content_type.app_label}.{content_type.model}"


def validate_target_type(content_type, allowed_targets, field_name="target"):
    label = content_type_label(content_type)
    if label and label not in allowed_targets:
        allowed = ", ".join(sorted(allowed_targets))
        raise ValidationError(
            {field_name: f"{label} is not supported. Allowed targets: {allowed}."}
        )


def validate_dimension_ratings(value):
    if not isinstance(value, dict):
        raise ValidationError("Dimension ratings must be an object.")

    unsupported = set(value) - FEEDBACK_DIMENSIONS
    if unsupported:
        raise ValidationError(
            f"Unsupported rating dimensions: {', '.join(sorted(unsupported))}."
        )

    invalid = {
        key: rating
        for key, rating in value.items()
        if not isinstance(rating, int) or isinstance(rating, bool) or not 1 <= rating <= 5
    }
    if invalid:
        raise ValidationError(
            "Every dimension rating must be an integer between 1 and 5."
        )


class ReviewQuerySet(models.QuerySet):
    def published(self):
        return self.filter(status=Review.Status.PUBLISHED)

    def featured(self):
        return self.published().filter(is_featured=True)

    def verified(self):
        return self.filter(is_verified=True)


class Review(models.Model):
    """Moderated, public-facing social proof for a course or program."""

    class Status(models.TextChoices):
        PENDING = "pending", "Pending moderation"
        PUBLISHED = "published", "Published"
        REJECTED = "rejected", "Rejected"
        ARCHIVED = "archived", "Archived"

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="public_reviews",
        limit_choices_to={"role": "student"},
    )
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.PROTECT,
        related_name="public_reviews",
    )
    object_id = models.PositiveBigIntegerField()
    target = GenericForeignKey("content_type", "object_id")

    rating = models.PositiveSmallIntegerField(validators=RATING_VALIDATORS)
    title = models.CharField(max_length=160, blank=True)
    comment = models.TextField()
    sentiments = models.JSONField(default=list, blank=True)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        db_index=True,
    )
    is_verified = models.BooleanField(default=False, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    helpful_count = models.PositiveIntegerField(default=0)

    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ReviewQuerySet.as_manager()

    class Meta:
        ordering = ["-is_featured", "-helpful_count", "-created_at"]
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
            models.Index(fields=["status", "rating"]),
            models.Index(fields=["status", "is_featured"]),
            models.Index(fields=["status", "is_verified"]),
        ]

    def clean(self):
        super().clean()
        validate_target_type(self.content_type, PUBLIC_REVIEW_TARGETS)

        if self.target is None and self.content_type_id and self.object_id:
            raise ValidationError({"target": "The selected review target does not exist."})

        if not isinstance(self.sentiments, list) or any(
            not isinstance(item, str) for item in self.sentiments
        ):
            raise ValidationError(
                {"sentiments": "Sentiments must be a list of text labels."}
            )

    def save(self, *args, **kwargs):
        if self.status == self.Status.PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        elif self.status != self.Status.PUBLISHED:
            self.published_at = None
        super().save(*args, **kwargs)

    @property
    def target_type(self):
        return content_type_label(self.content_type)

    @property
    def target_name(self):
        return str(self.target) if self.target is not None else "Deleted target"

    def __str__(self):
        return f"{self.student} rated {self.target_name} {self.rating}/5"


class FeedbackSubmission(models.Model):
    """Private operational feedback for learning experiences at any granularity."""

    class Kind(models.TextChoices):
        PROGRAM = "program", "Program feedback"
        COURSE = "course", "Course feedback"
        MODULE = "module", "Module feedback"
        LESSON = "lesson", "Lesson feedback"
        LIVE_CLASS = "live_class", "Live class feedback"
        COHORT = "cohort", "Cohort feedback"
        GENERAL = "general", "General feedback"

    class Status(models.TextChoices):
        SUBMITTED = "submitted", "Submitted"
        REVIEWED = "reviewed", "Reviewed"
        FLAGGED = "flagged", "Flagged"
        ARCHIVED = "archived", "Archived"

    class Visibility(models.TextChoices):
        STAFF = "staff", "Staff only"
        INSTRUCTORS = "instructors", "Assigned instructors and staff"
        ADMIN = "admin", "Administrators only"

    student = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="feedback_submissions",
        limit_choices_to={"role": "student"},
    )
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.PROTECT,
        related_name="feedback_submissions",
    )
    object_id = models.PositiveBigIntegerField()
    target = GenericForeignKey("content_type", "object_id")

    kind = models.CharField(max_length=20, choices=Kind.choices)
    overall_rating = models.PositiveSmallIntegerField(
        validators=RATING_VALIDATORS,
        null=True,
        blank=True,
    )
    dimension_ratings = models.JSONField(
        default=dict,
        blank=True,
        validators=[validate_dimension_ratings],
    )
    comment = models.TextField(blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    is_anonymous = models.BooleanField(default=False)
    visibility = models.CharField(
        max_length=20,
        choices=Visibility.choices,
        default=Visibility.STAFF,
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.SUBMITTED,
        db_index=True,
    )
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_feedback_submissions",
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
            models.Index(fields=["kind", "status"]),
            models.Index(fields=["student", "created_at"]),
        ]
        constraints = [
            models.UniqueConstraint(
                fields=["student", "content_type", "object_id", "kind"],
                name="unique_student_feedback_per_target_kind",
            )
        ]

    def clean(self):
        super().clean()
        validate_target_type(self.content_type, FEEDBACK_TARGETS)

        if self.target is None and self.content_type_id and self.object_id:
            raise ValidationError(
                {"target": "The selected feedback target does not exist."}
            )

        expected_kind = {
            "programs.learningprogram": self.Kind.PROGRAM,
            "courses.courseproduct": self.Kind.COURSE,
            "courses.course": self.Kind.COURSE,
            "courses.module": self.Kind.MODULE,
            "courses.lesson": self.Kind.LESSON,
            "live_classes.liveclass": self.Kind.LIVE_CLASS,
            "institution.academicbatch": self.Kind.COHORT,
        }.get(self.target_type)

        if self.kind != self.Kind.GENERAL and expected_kind and self.kind != expected_kind:
            raise ValidationError(
                {"kind": f"{self.target_type} requires feedback kind '{expected_kind}'."}
            )

        if self.overall_rating is None and not self.dimension_ratings and not self.comment:
            raise ValidationError(
                "Feedback must include a rating, dimension rating, or comment."
            )

    @property
    def target_type(self):
        return content_type_label(self.content_type)

    @property
    def target_name(self):
        return str(self.target) if self.target is not None else "Deleted target"

    @property
    def student_display_name(self):
        return "Anonymous learner" if self.is_anonymous else str(self.student)

    def mark_reviewed(self, reviewer):
        self.status = self.Status.REVIEWED
        self.reviewed_by = reviewer
        self.reviewed_at = timezone.now()
        self.save(update_fields=["status", "reviewed_by", "reviewed_at", "updated_at"])

    def __str__(self):
        return f"{self.get_kind_display()} for {self.target_name}"


class FeedbackQuestion(models.Model):
    """Reusable survey question shown for a particular feedback workflow."""

    class ResponseType(models.TextChoices):
        RATING = "rating", "1–5 rating"
        TEXT = "text", "Free text"
        SINGLE_CHOICE = "single_choice", "Single choice"
        MULTIPLE_CHOICE = "multiple_choice", "Multiple choice"
        BOOLEAN = "boolean", "Yes or no"

    feedback_kind = models.CharField(
        max_length=20,
        choices=FeedbackSubmission.Kind.choices,
        db_index=True,
    )
    prompt = models.CharField(max_length=300)
    help_text = models.CharField(max_length=300, blank=True)
    response_type = models.CharField(max_length=30, choices=ResponseType.choices)
    dimension_key = models.CharField(max_length=40, blank=True)
    choices = models.JSONField(default=list, blank=True)
    is_required = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, db_index=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["feedback_kind", "display_order", "id"]
        indexes = [
            models.Index(fields=["feedback_kind", "is_active", "display_order"])
        ]

    def clean(self):
        super().clean()
        if self.dimension_key and self.dimension_key not in FEEDBACK_DIMENSIONS:
            raise ValidationError(
                {"dimension_key": "Choose a supported feedback dimension."}
            )

        choice_types = {
            self.ResponseType.SINGLE_CHOICE,
            self.ResponseType.MULTIPLE_CHOICE,
        }
        if self.response_type in choice_types and (
            not isinstance(self.choices, list) or len(self.choices) < 2
        ):
            raise ValidationError(
                {"choices": "Choice questions require at least two options."}
            )
        if self.response_type not in choice_types and self.choices:
            raise ValidationError(
                {"choices": "Only choice questions may define options."}
            )

    def __str__(self):
        return self.prompt


class FeedbackAnswer(models.Model):
    """One typed answer belonging to a feedback submission."""

    submission = models.ForeignKey(
        FeedbackSubmission,
        on_delete=models.CASCADE,
        related_name="answers",
    )
    question = models.ForeignKey(
        FeedbackQuestion,
        on_delete=models.PROTECT,
        related_name="answers",
    )
    rating_value = models.PositiveSmallIntegerField(
        validators=RATING_VALIDATORS,
        null=True,
        blank=True,
    )
    text_value = models.TextField(blank=True)
    choice_values = models.JSONField(default=list, blank=True)
    boolean_value = models.BooleanField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["question__display_order", "id"]
        constraints = [
            models.UniqueConstraint(
                fields=["submission", "question"],
                name="unique_feedback_answer_per_question",
            )
        ]

    def clean(self):
        super().clean()
        if self.submission_id and self.question_id:
            if self.submission.kind != self.question.feedback_kind:
                raise ValidationError(
                    {"question": "Question does not belong to this feedback workflow."}
                )

        values = {
            FeedbackQuestion.ResponseType.RATING: self.rating_value is not None,
            FeedbackQuestion.ResponseType.TEXT: bool(self.text_value.strip()),
            FeedbackQuestion.ResponseType.SINGLE_CHOICE: bool(self.choice_values),
            FeedbackQuestion.ResponseType.MULTIPLE_CHOICE: bool(self.choice_values),
            FeedbackQuestion.ResponseType.BOOLEAN: self.boolean_value is not None,
        }
        if self.question_id and not values[self.question.response_type]:
            raise ValidationError("Provide an answer matching the question type.")

        if self.question_id and self.question.response_type in {
            FeedbackQuestion.ResponseType.SINGLE_CHOICE,
            FeedbackQuestion.ResponseType.MULTIPLE_CHOICE,
        }:
            if not isinstance(self.choice_values, list):
                raise ValidationError(
                    {"choice_values": "Choices must be supplied as a list."}
                )
            invalid = set(self.choice_values) - set(self.question.choices)
            if invalid:
                raise ValidationError(
                    {"choice_values": "Answer contains an unsupported choice."}
                )
            if (
                self.question.response_type
                == FeedbackQuestion.ResponseType.SINGLE_CHOICE
                and len(self.choice_values) != 1
            ):
                raise ValidationError(
                    {"choice_values": "Select exactly one option."}
                )

    def __str__(self):
        return f"Answer to {self.question_id} in submission {self.submission_id}"
