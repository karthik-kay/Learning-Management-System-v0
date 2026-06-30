from django.contrib import admin
from .models import InstructorApplication, Lead, LeadFollowUp, PartnerEnquiry


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'assigned_to', 'source', 'created_at')
    list_filter = ('status', 'source')
    search_fields = ('name', 'phone', 'email')


@admin.register(LeadFollowUp)
class LeadFollowUpAdmin(admin.ModelAdmin):
    list_display = ('lead', 'followup_type', 'created_by', 'created_at')
    list_filter = ('followup_type',)


@admin.register(InstructorApplication)
class InstructorApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'current_role', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'phone', 'current_role', 'company')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(PartnerEnquiry)
class PartnerEnquiryAdmin(admin.ModelAdmin):
    list_display = (
        'organization_name',
        'contact_name',
        'partnership_type',
        'status',
        'created_at',
    )
    list_filter = ('partnership_type', 'status', 'created_at')
    search_fields = (
        'organization_name',
        'contact_name',
        'work_email',
        'phone',
    )
    readonly_fields = ('created_at', 'updated_at')
