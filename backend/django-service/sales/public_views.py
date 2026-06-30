from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.throttling import SimpleRateThrottle

from .models import InstructorApplication, PartnerEnquiry
from .public_serializers import (
    InstructorApplicationCreateSerializer,
    PartnerEnquiryCreateSerializer,
)


class PublicFormThrottle(SimpleRateThrottle):
    scope = "public_forms"
    rate = "10/hour"

    def get_cache_key(self, request, view):
        ident = self.get_ident(request)
        return self.cache_format % {"scope": self.scope, "ident": ident}


class InstructorApplicationCreateAPIView(generics.CreateAPIView):
    queryset = InstructorApplication.objects.all()
    serializer_class = InstructorApplicationCreateSerializer
    permission_classes = [AllowAny]
    throttle_classes = [PublicFormThrottle]


class PartnerEnquiryCreateAPIView(generics.CreateAPIView):
    queryset = PartnerEnquiry.objects.all()
    serializer_class = PartnerEnquiryCreateSerializer
    permission_classes = [AllowAny]
    throttle_classes = [PublicFormThrottle]
