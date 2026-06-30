from django.urls import path

from .public_views import (
    PublicCertificationDetailAPIView,
    PublicCertificationListAPIView,
)

urlpatterns = [
    path("", PublicCertificationListAPIView.as_view(), name="public-certifications"),
    path(
        "<slug:slug>/",
        PublicCertificationDetailAPIView.as_view(),
        name="public-certification-detail",
    ),
]
