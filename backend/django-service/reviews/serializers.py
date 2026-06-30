from rest_framework import serializers

from .models import Review


class ReviewSerializer(serializers.ModelSerializer):
    target_type = serializers.CharField(read_only=True)
    target_name = serializers.CharField(read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "student",
            "content_type",
            "object_id",
            "target_type",
            "target_name",
            "rating",
            "title",
            "comment",
            "sentiments",
            "status",
            "is_verified",
            "is_featured",
            "helpful_count",
            "published_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "student",
            "status",
            "is_verified",
            "is_featured",
            "helpful_count",
            "published_at",
            "created_at",
            "updated_at",
        ]


class PublicReviewSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    student_initials = serializers.SerializerMethodField()
    student_avatar = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "title",
            "comment",
            "sentiments",
            "is_verified",
            "is_featured",
            "helpful_count",
            "published_at",
            "created_at",
            "student_name",
            "student_initials",
            "student_avatar",
            "target",
        ]

    def get_student_name(self, obj):
        full_name = obj.student.get_full_name().strip()
        if full_name:
            return full_name
        return obj.student.username.split("@")[0].replace(".", " ").title()

    def get_student_initials(self, obj):
        name = self.get_student_name(obj)
        return "".join(part[0] for part in name.split()[:2]).upper() or "LS"

    def get_student_avatar(self, obj):
        if not obj.student.profile_image:
            return ""
        try:
            return obj.student.profile_image.url
        except ValueError:
            return ""

    def get_target(self, obj):
        target = obj.target
        label = obj.target_type
        kind = {
            "courses.course": "course",
            "courses.courseproduct": "course_product",
            "programs.learningprogram": "program",
        }.get(label, label)

        if target is None:
            return {
                "key": f"{kind}:{obj.object_id}",
                "id": obj.object_id,
                "kind": kind,
                "name": "Unavailable learning experience",
                "slug": "",
                "category": "",
            }

        if label == "courses.courseproduct":
            category = target.course.domain or ""
        elif label == "courses.course":
            category = target.domain or ""
        else:
            category = target.get_program_type_display()

        return {
            "key": f"{kind}:{target.pk}",
            "id": target.pk,
            "kind": kind,
            "name": str(target),
            "slug": getattr(target, "slug", "") or "",
            "category": category,
        }
