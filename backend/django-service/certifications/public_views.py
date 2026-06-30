from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .models import CertificationOffering
from .serializers import (
    PublicCertificationDetailSerializer,
    PublicCertificationListSerializer,
)


class PublicCertificationListAPIView(ListAPIView):
    serializer_class = PublicCertificationListSerializer
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        queryset = CertificationOffering.objects.filter(is_active=True)
        certification_type = self.request.query_params.get("type")
        domain = self.request.query_params.get("domain")
        if certification_type:
            queryset = queryset.filter(certification_type=certification_type)
        if domain:
            queryset = queryset.filter(domain=domain)
        return queryset


class PublicCertificationDetailAPIView(RetrieveAPIView):
    serializer_class = PublicCertificationDetailSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

    def get_queryset(self):
        return CertificationOffering.objects.filter(is_active=True).select_related(
            "course", "program"
        )
