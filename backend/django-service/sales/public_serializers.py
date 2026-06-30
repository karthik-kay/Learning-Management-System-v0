from rest_framework import serializers

from .models import InstructorApplication, PartnerEnquiry


class PublicFormSerializer(serializers.ModelSerializer):
    honeypot = serializers.CharField(
        required=False, allow_blank=True, write_only=True
    )

    def validate_honeypot(self, value):
        if value:
            raise serializers.ValidationError("Unable to submit this form.")
        return value

    def validate(self, attrs):
        attrs.pop("honeypot", None)
        return super().validate(attrs)


class InstructorApplicationCreateSerializer(
    PublicFormSerializer
):
    class Meta:
        model = InstructorApplication
        fields = [
            "id", "name", "email", "phone", "current_role", "company",
            "expertise", "years_experience", "linkedin_url", "portfolio_url",
            "motivation", "honeypot", "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_expertise(self, value):
        if not isinstance(value, list) or not value or any(
            not isinstance(item, str) or not item.strip() for item in value
        ):
            raise serializers.ValidationError("Add at least one expertise area.")
        return value[:12]


class PartnerEnquiryCreateSerializer(PublicFormSerializer):
    class Meta:
        model = PartnerEnquiry
        fields = [
            "id", "organization_name", "contact_name", "work_email", "phone",
            "partnership_type", "website_url", "organization_size", "message",
            "honeypot", "created_at",
        ]
        read_only_fields = ["id", "created_at"]
