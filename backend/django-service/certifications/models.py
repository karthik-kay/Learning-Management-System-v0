import uuid
from django.db import models
from django.utils.text import slugify

class Certificate(models.Model):
    id            = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student       = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='certificates')
    course        = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='certificates')
    issued_at     = models.DateTimeField(auto_now_add=True)
    credential_id = models.CharField(max_length=16, unique=True, editable=False)

    class Meta:
        unique_together = ('student', 'course')
        ordering = ['-issued_at']

    def save(self, *args, **kwargs):
        if not self.credential_id:
            self.credential_id = f"LF-{uuid.uuid4().hex[:6].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.user.username} | {self.course.title} | {self.credential_id}"


class CertificationOffering(models.Model):
    class CertificationType(models.TextChoices):
        PROGRAM = "program", "Program"
        TRACK = "track", "Track"
        COURSE = "course", "Course"

    class Domain(models.TextChoices):
        FULL_STACK = "full-stack", "Full Stack"
        DATA = "data", "Data"
        AI = "ai", "AI"
        DEVOPS = "devops", "DevOps"
        SECURITY = "security", "Security"

    title = models.CharField(max_length=220)
    slug = models.SlugField(max_length=240, unique=True, blank=True)
    short_description = models.CharField(max_length=320)
    description = models.TextField()
    certification_type = models.CharField(
        max_length=20, choices=CertificationType.choices
    )
    domain = models.CharField(max_length=30, choices=Domain.choices)
    level = models.CharField(max_length=80)
    duration = models.CharField(max_length=80)
    skills = models.JSONField(default=list)
    outcomes = models.JSONField(default=list)
    requirements = models.JSONField(default=list)
    assessment_methods = models.JSONField(default=list)
    projects = models.JSONField(default=list)
    course = models.ForeignKey(
        "courses.Course",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="certification_offerings",
    )
    program = models.ForeignKey(
        "programs.LearningProgram",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="certification_offerings",
    )
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True, db_index=True)
    sort_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]
        indexes = [
            models.Index(fields=["is_active", "sort_order"]),
            models.Index(fields=["certification_type", "domain"]),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            candidate = base_slug
            counter = 2
            while CertificationOffering.objects.exclude(pk=self.pk).filter(
                slug=candidate
            ).exists():
                candidate = f"{base_slug}-{counter}"
                counter += 1
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
