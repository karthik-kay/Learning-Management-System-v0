from django.contrib import admin

from .models import PublicSupportRequest, Ticket, TicketMessage


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("title", "created_by", "type", "status", "created_at")
    list_filter = ("type", "status", "assigned_to_role")
    search_fields = ("title", "description", "created_by__username")


@admin.register(TicketMessage)
class TicketMessageAdmin(admin.ModelAdmin):
    list_display = ("ticket", "sender", "sender_type", "created_at")
    list_filter = ("sender_type",)
    search_fields = ("message", "sender__username")


@admin.register(PublicSupportRequest)
class PublicSupportRequestAdmin(admin.ModelAdmin):
    list_display = (
        "reference_code",
        "subject",
        "name",
        "category",
        "status",
        "created_at",
    )
    list_filter = ("category", "status", "created_at")
    search_fields = (
        "reference_code",
        "subject",
        "message",
        "name",
        "email",
    )
    readonly_fields = ("id", "reference_code", "created_at", "updated_at")
