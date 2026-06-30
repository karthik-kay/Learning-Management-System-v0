from django.urls import path

from .public_views import PublicSupportRequestCreateAPIView

urlpatterns = [
    path(
        "requests/",
        PublicSupportRequestCreateAPIView.as_view(),
        name="public-support-request",
    ),
]
