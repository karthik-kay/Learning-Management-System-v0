from django.db import models
from django.conf import settings


class Lead(models.Model):

    class Status(models.TextChoices):
        NEW = 'new', 'New'
        CONTACTED = 'contacted', 'Contacted'
        INTERESTED = 'interested', 'Interested'
        FOLLOW_UP = 'follow_up', 'Follow Up'
        CONVERTED = 'converted', 'Converted'
        LOST = 'lost', 'Lost'

    class Source(models.TextChoices):
        WEBSITE = 'website', 'Website'
        REFERRAL = 'referral', 'Referral'
        SOCIAL = 'social_media', 'Social Media'
        WALK_IN = 'walk_in', 'Walk In'
        EXCEL = 'excel_upload', 'Excel Upload'
        OTHER = 'other', 'Other'

    # Basic Info
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)

    # LMS Integration
    course_interested = models.ForeignKey(
        'courses.Course',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='leads'
    )

    # Sales Metadata
    source = models.CharField(
        max_length=20,
        choices=Source.choices,
        default=Source.OTHER
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_leads',
        limit_choices_to={'role__in': ['sales_exec', 'sales_manager', 'sales_admin']}
    )

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_leads'
    )

    next_follow_up = models.DateTimeField(null=True, blank=True)

    converted_student = models.ForeignKey(
        'students.Student',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='originating_leads'
    )

    remarks = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['assigned_to']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return f"{self.name} - {self.get_status_display()}"


class LeadFollowUp(models.Model):

    class FollowUpType(models.TextChoices):
        CALL = 'call', 'Call'
        WHATSAPP = 'whatsapp', 'WhatsApp'
        EMAIL = 'email', 'Email'
        MEETING = 'meeting', 'Meeting'
        NOTE = 'note', 'Note'

    lead = models.ForeignKey(
        Lead,
        on_delete=models.CASCADE,
        related_name='followups'
    )

    followup_type = models.CharField(
        max_length=20,
        choices=FollowUpType.choices,
        default=FollowUpType.CALL
    )

    note = models.TextField()

    next_date = models.DateTimeField(null=True, blank=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        # Sync next follow-up + auto update status
        if self.next_date:
            self.lead.next_follow_up = self.next_date
            self.lead.status = Lead.Status.FOLLOW_UP
            self.lead.save(update_fields=['next_follow_up', 'status'])

    def __str__(self):
        return f"{self.lead.name} - {self.followup_type}"


class InstructorApplication(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        REVIEWING = "reviewing", "Reviewing"
        INTERVIEW = "interview", "Interview"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    name = models.CharField(max_length=180)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    current_role = models.CharField(max_length=180)
    company = models.CharField(max_length=180, blank=True)
    expertise = models.JSONField(default=list)
    years_experience = models.PositiveIntegerField(default=0)
    linkedin_url = models.URLField(blank=True)
    portfolio_url = models.URLField(blank=True)
    motivation = models.TextField()
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["status", "created_at"])]

    def __str__(self):
        return f"{self.name} - instructor application"


class PartnerEnquiry(models.Model):
    class PartnershipType(models.TextChoices):
        INSTITUTION = "institution", "Institution Partner"
        PRO = "pro", "PRO Partner"
        PLACEMENT = "placement", "Placement Partner"

    class Status(models.TextChoices):
        NEW = "new", "New"
        CONTACTED = "contacted", "Contacted"
        QUALIFIED = "qualified", "Qualified"
        CONVERTED = "converted", "Converted"
        CLOSED = "closed", "Closed"

    organization_name = models.CharField(max_length=220)
    contact_name = models.CharField(max_length=180)
    work_email = models.EmailField()
    phone = models.CharField(max_length=20)
    partnership_type = models.CharField(
        max_length=20, choices=PartnershipType.choices
    )
    website_url = models.URLField(blank=True)
    organization_size = models.CharField(max_length=80, blank=True)
    message = models.TextField()
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["partnership_type", "created_at"]),
        ]

    def __str__(self):
        return f"{self.organization_name} - {self.get_partnership_type_display()}"
