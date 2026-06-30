from django.urls import path

from .public_views import PublicReviewListAPIView, PublicReviewSummaryAPIView


urlpatterns = [
    path("", PublicReviewListAPIView.as_view(), name="public-review-list"),
    path(
        "summary/",
        PublicReviewSummaryAPIView.as_view(),
        name="public-review-summary",
    ),
]
