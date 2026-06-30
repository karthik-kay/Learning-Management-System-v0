import uuid
from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL


class Ticket(models.Model):

    TICKET_TYPE_CHOICES = [
        ('support', 'Support'),
        ('sales', 'Sales'),
        ('admin', 'Admin'),
    ]

    ASSIGNED_ROLE_CHOICES = [
        ('faculty', 'Faculty'),
        ('sales', 'Sales'),
        ('admin', 'Admin'),
    ]

    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('awaiting_student', 'Awaiting Student Response'),
        ('reopened', 'Reopened'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets')
    title = models.CharField(max_length=255)
    description = models.TextField()
    attachment = models.FileField(upload_to='tickets/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    type = models.CharField(max_length=20, choices=TICKET_TYPE_CHOICES)
    assigned_to_role = models.CharField(max_length=20, choices=ASSIGNED_ROLE_CHOICES, default='faculty')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.type}) - {self.status}"


class PublicSupportRequest(models.Model):
    class Category(models.TextChoices):
        ADMISSIONS = "admissions", "Admissions"
        PROGRAM = "program", "Program or curriculum"
        PAYMENT = "payment", "Payment or refund"
        PLACEMENT = "placement", "Placement support"
        CERTIFICATE = "certificate", "Certificate"
        TECHNICAL = "technical", "Technical issue"
        ACCOUNT = "account", "Account access"
        OTHER = "other", "Other"

    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        RESOLVED = "resolved", "Resolved"
        CLOSED = "closed", "Closed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_code = models.CharField(max_length=16, unique=True, editable=False)
    name = models.CharField(max_length=180)
    email = models.EmailField(db_index=True)
    phone = models.CharField(max_length=24, blank=True)
    category = models.CharField(max_length=24, choices=Category.choices)
    subject = models.CharField(max_length=220)
    message = models.TextField()
    source_path = models.CharField(max_length=255, blank=True)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NEW, db_index=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["status", "created_at"]),
            models.Index(fields=["category", "created_at"]),
        ]

    def save(self, *args, **kwargs):
        if not self.reference_code:
            candidate = f"SUP-{uuid.uuid4().hex[:8].upper()}"
            while PublicSupportRequest.objects.filter(
                reference_code=candidate
            ).exists():
                candidate = f"SUP-{uuid.uuid4().hex[:8].upper()}"
            self.reference_code = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.reference_code} — {self.subject}"


class TicketMessage(models.Model):

    SENDER_TYPE_CHOICES = [
        ('student', 'Student'),
        ('staff', 'Staff'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ticket_messages')
    sender_type = models.CharField(max_length=10, choices=SENDER_TYPE_CHOICES)
    message = models.TextField()
    attachment = models.FileField(upload_to='ticket_messages/', blank=True, null=True)

    # for threading — reply to a specific message
    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='replies'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sender} ({self.sender_type}) → {self.ticket.id}"
