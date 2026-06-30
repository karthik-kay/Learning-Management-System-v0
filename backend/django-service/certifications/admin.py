from django.contrib import admin
from .models import Certificate, CertificationOffering

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display  = ['credential_id', 'student', 'course', 'issued_at']
    search_fields = ['credential_id', 'student__user__username', 'course__title']
    readonly_fields = ['id', 'credential_id', 'issued_at']


@admin.register(CertificationOffering)
class CertificationOfferingAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "certification_type",
        "domain",
        "level",
        "is_active",
        "is_featured",
        "sort_order",
    ]
    list_filter = ["certification_type", "domain", "is_active", "is_featured"]
    search_fields = ["title", "short_description", "skills"]
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ["is_active", "is_featured", "sort_order"]
