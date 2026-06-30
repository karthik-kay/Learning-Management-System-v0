from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.throttling import SimpleRateThrottle

from .models import PublicSupportRequest
from .public_serializers import PublicSupportRequestSerializer


class PublicSupportThrottle(SimpleRateThrottle):
    scope = "public_support"
    rate = "8/hour"

    def get_cache_key(self, request, view):
        ident = self.get_ident(request)
        return self.cache_format % {"scope": self.scope, "ident": ident}


class PublicSupportRequestCreateAPIView(CreateAPIView):
    queryset = PublicSupportRequest.objects.all()
    serializer_class = PublicSupportRequestSerializer
    permission_classes = [AllowAny]
    throttle_classes = [PublicSupportThrottle]
