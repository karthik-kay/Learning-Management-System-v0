from django.urls import path

from .public_views import (
    InstructorApplicationCreateAPIView,
    PartnerEnquiryCreateAPIView,
)

urlpatterns = [
    path("instructor-applications/", InstructorApplicationCreateAPIView.as_view()),
    path("partner-enquiries/", PartnerEnquiryCreateAPIView.as_view()),
]
