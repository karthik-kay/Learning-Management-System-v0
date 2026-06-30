from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.core.exceptions import ValidationError
from django.utils.text import slugify


class FacultyProfile(models.Model):
    class Availability(models.TextChoices):
        AVAILABLE = "available", "Available for mentoring"
        WAITLIST = "waitlist", "Join waitlist"
        UNAVAILABLE = "unavailable", "Currently unavailable"

    user = models.OneToOneField(
        "users.CustomUser",
        on_delete=models.CASCADE,
        related_name="public_faculty_profile",
        limit_choices_to={"role__in": ["faculty", "trainer"]},
    )
    display_name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)
    headline = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.URLField(blank=True, null=True)
    expertise = models.JSONField(default=list, blank=True)
    job_title = models.CharField(max_length=150, blank=True)
    company = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)
    languages = models.JSONField(default=list, blank=True)
    experience = models.JSONField(default=list, blank=True)
    achievements = models.JSONField(default=list, blank=True)
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    booking_url = models.URLField(blank=True, null=True)
    availability = models.CharField(
        max_length=20,
        choices=Availability.choices,
        default=Availability.AVAILABLE,
        db_index=True,
    )
    session_duration_minutes = models.PositiveIntegerField(default=60)
    session_price_paise = models.PositiveIntegerField(null=True, blank=True)
    years_experience = models.PositiveIntegerField(default=0)
    students_mentored = models.PositiveIntegerField(default=0)
    sessions_completed = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False, db_index=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_public = models.BooleanField(default=True, db_index=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    reviews = GenericRelation(
        "reviews.Review",
        content_type_field="content_type",
        object_id_field="object_id",
        related_query_name="faculty_profiles",
    )

    class Meta:
        ordering = ["display_order", "-is_featured", "display_name"]
        indexes = [
            models.Index(fields=["slug"]),
            models.Index(fields=["is_public"]),
            models.Index(fields=["is_public", "is_featured", "display_order"]),
            models.Index(fields=["availability"]),
        ]

    def clean(self):
        super().clean()
        list_fields = {
            "expertise": self.expertise,
            "languages": self.languages,
            "experience": self.experience,
            "achievements": self.achievements,
        }
        for field_name, value in list_fields.items():
            if not isinstance(value, list):
                raise ValidationError({field_name: "Value must be a list."})

        if any(not isinstance(item, str) for item in self.expertise):
            raise ValidationError({"expertise": "Expertise must contain text labels."})
        if any(not isinstance(item, str) for item in self.languages):
            raise ValidationError({"languages": "Languages must contain text labels."})
        if any(not isinstance(item, dict) for item in self.experience):
            raise ValidationError(
                {"experience": "Experience entries must be structured objects."}
            )
        if any(not isinstance(item, dict) for item in self.achievements):
            raise ValidationError(
                {"achievements": "Achievement entries must be structured objects."}
            )

    def save(self, *args, **kwargs):
        if not self.display_name:
            full_name = self.user.get_full_name().strip()
            self.display_name = full_name or self.user.username

        if not self.slug:
            base_slug = slugify(self.display_name)
            unique_slug = base_slug
            counter = 1

            while FacultyProfile.objects.filter(slug=unique_slug).exclude(pk=self.pk).exists():
                counter += 1
                unique_slug = f"{base_slug}-{counter}"

            self.slug = unique_slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.display_name
