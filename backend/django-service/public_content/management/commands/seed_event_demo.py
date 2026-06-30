from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from courses.models import Course, CourseProduct
from programs.models import LearningProgram
from public_content.models import PublicEvent


EVENTS = [
    ("AI Engineering Career Roadmap", "ai-engineering-roadmap", "webinar", 7, 90, "Nisha Patel", "Online", "", "", True),
    ("System Design for First Jobs", "system-design-first-jobs", "webinar", 12, 75, "Arjun Rao", "Online", "", "", False),
    ("React Dashboard Sprint", "react-dashboard-sprint", "workshop", 10, 150, "Meera Iyer", "Online lab", "", "", True),
    ("Django API Production Basics", "django-api-production", "workshop", 18, 120, "Rahul Verma", "Online lab", "", "", False),
    ("Full Stack Certification Exam", "full-stack-certification-exam", "exam", 28, 120, "", "Proctored online", "", "", False),
    ("AI Track Assessment", "ai-track-assessment", "exam", 35, 120, "", "Proctored online", "", "", False),
    ("Secure the API Bounty", "secure-api-bounty", "bounty", 14, 10080, "Security Review Team", "Online challenge", "INR 25K", "Individual", True),
    ("Analytics Performance Bounty", "analytics-performance-bounty", "bounty", 23, 10080, "Platform Team", "Online challenge", "INR 18K", "Individual", False),
    ("AI Product Weekend", "ai-product-weekend", "hackathon", 20, 2160, "AI Mentor Panel", "Hybrid", "INR 1L", "2–4 learners", True),
    ("Placement Tools Hackathon", "placement-tools-hackathon", "hackathon", 40, 2160, "Career Tech Panel", "Online", "INR 75K", "2–3 learners", False),
    ("Open Source Project Showcase", "open-source-project-showcase", "community", 16, 90, "LearnerSlate Community", "Online", "", "", False),
    ("New Cohort Welcome Meetup", "cohort-welcome-meetup", "community", 30, 75, "Student Success Team", "Online", "", "", False),
]


def payload_for(event_type, title, starts_at):
    payload = {
        "cta_label": "View Event",
        "theme": title.split()[0],
        "requirements": [
            "A laptop with a stable internet connection",
            "A LearnerSlate account",
            "Curiosity and willingness to participate",
        ],
        "agenda": [
            {
                "time": "00:00",
                "title": "Welcome and context",
                "description": "Meet the host and understand the outcome for the session.",
            },
            {
                "time": "00:15",
                "title": "Main learning session",
                "description": "Work through the core ideas, examples, and practical decisions.",
            },
            {
                "time": "01:00",
                "title": "Questions and next steps",
                "description": "Clarify doubts and leave with a concrete action plan.",
            },
        ],
        "speakers": [
            {
                "name": "LearnerSlate Mentor",
                "role": "Industry Mentor",
                "company": "LearnerSlate",
            }
        ],
        "faqs": [
            {
                "question": "Do I need prior experience?",
                "answer": "The event description explains any prerequisites. Most sessions are designed to remain useful for motivated beginners.",
            },
            {
                "question": "Will a recording be available?",
                "answer": "Recording availability depends on the event format and will be shared with registered participants when permitted.",
            },
        ],
    }
    if event_type in {"bounty", "hackathon"}:
        payload["deadline"] = (starts_at - timedelta(days=2)).strftime("%d %B %Y")
    if event_type == "exam":
        payload["certification"] = title.replace(" Exam", "")
    return payload


class Command(BaseCommand):
    help = "Create or refresh published demo events for the public events pages."

    @transaction.atomic
    def handle(self, *args, **options):
        now = timezone.now()
        program = LearningProgram.objects.filter(is_published=True).first()
        course = Course.objects.filter(is_active=True).first()
        course_product = None
        if course:
            course_product, _ = CourseProduct.objects.update_or_create(
                course=course,
                defaults={
                    "title": course.title,
                    "short_description": course.description[:240],
                    "is_published": True,
                    "published_at": now,
                },
            )

        created_count = 0
        updated_count = 0
        for order, (
            title,
            slug,
            event_type,
            days_from_now,
            duration_minutes,
            mentor,
            location,
            prize,
            team_size,
            featured,
        ) in enumerate(EVENTS, start=1):
            starts_at = now + timedelta(days=days_from_now)
            short_description = (
                f"Join {title} for practical guidance, live examples, and clear next steps."
            )
            event, created = PublicEvent.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "event_type": event_type,
                    "short_description": short_description,
                    "description": (
                        f"{short_description}\n\n"
                        "This session is designed around practical participation rather "
                        "than passive watching. Bring your questions and leave with work "
                        "you can continue after the event."
                    ),
                    "starts_at": starts_at,
                    "ends_at": starts_at + timedelta(minutes=duration_minutes),
                    "mentor_name": mentor,
                    "location_label": location,
                    "register_url": "",
                    "prize_pool": prize,
                    "team_size": team_size,
                    "is_featured": featured,
                    "display_order": order,
                    "status": PublicEvent.Status.PUBLISHED,
                    "published_at": now,
                    "payload": payload_for(event_type, title, starts_at),
                },
            )
            if program:
                event.related_programs.set([program])
            if course_product:
                event.related_courses.set([course_product])
            created_count += int(created)
            updated_count += int(not created)

        self.stdout.write(
            self.style.SUCCESS(
                f"Event demo data ready: {created_count} events created, "
                f"{updated_count} events updated."
            )
        )
