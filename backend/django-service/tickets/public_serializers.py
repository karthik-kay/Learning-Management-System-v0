from rest_framework import serializers

from .models import PublicSupportRequest


class PublicSupportRequestSerializer(serializers.ModelSerializer):
    honeypot = serializers.CharField(
        required=False, allow_blank=True, write_only=True
    )

    class Meta:
        model = PublicSupportRequest
        fields = [
            "reference_code",
            "name",
            "email",
            "phone",
            "category",
            "subject",
            "message",
            "source_path",
            "honeypot",
            "created_at",
        ]
        read_only_fields = ["reference_code", "created_at"]

    def validate_honeypot(self, value):
        if value:
            raise serializers.ValidationError("Unable to submit this request.")
        return value

    def validate(self, attrs):
        attrs.pop("honeypot", None)
        return super().validate(attrs)
