from datetime import timedelta

from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from faculty.models import FacultyProfile
from reviews.models import Review
from users.models import CustomUser


MENTORS = [
    {
        "name": ("Arjun", "Rao"),
        "slug": "arjun-rao",
        "job_title": "Staff Software Engineer",
        "company": "Fintech Platform",
        "headline": "Backend architecture, system design, and engineering career growth.",
        "bio": "Arjun helps engineers move from feature delivery to confident system ownership. His sessions focus on architecture decisions, debugging production systems, and communicating technical tradeoffs clearly.",
        "avatar": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
        "expertise": ["System Design", "Backend Engineering", "Career Growth"],
        "languages": ["English", "Hindi", "Telugu"],
        "years": 11,
        "students": 420,
        "sessions": 680,
        "featured": True,
        "availability": "available",
    },
    {
        "name": ("Nisha", "Patel"),
        "slug": "nisha-patel",
        "job_title": "Senior Data Scientist",
        "company": "Consumer Analytics",
        "headline": "Data careers, machine learning projects, and interview preparation.",
        "bio": "Nisha mentors analysts and engineers who want to build credible data portfolios. She brings a practical focus to experimentation, stakeholder communication, and responsible machine learning.",
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
        "expertise": ["Data Science", "Machine Learning", "Interview Prep"],
        "languages": ["English", "Hindi", "Gujarati"],
        "years": 9,
        "students": 360,
        "sessions": 515,
        "featured": True,
        "availability": "waitlist",
    },
    {
        "name": ("Meera", "Iyer"),
        "slug": "meera-iyer",
        "job_title": "Frontend Engineering Lead",
        "company": "Design Systems Studio",
        "headline": "React architecture, accessibility, and portfolio-quality frontend work.",
        "bio": "Meera works with frontend developers on component architecture, design systems, accessibility, and the small implementation choices that make interfaces feel professional.",
        "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
        "expertise": ["React", "Frontend Architecture", "Accessibility"],
        "languages": ["English", "Tamil", "Hindi"],
        "years": 10,
        "students": 510,
        "sessions": 740,
        "featured": True,
        "availability": "available",
    },
    {
        "name": ("Rahul", "Verma"),
        "slug": "rahul-verma",
        "job_title": "Platform Engineer",
        "company": "Cloud Infrastructure",
        "headline": "Django, APIs, cloud delivery, and production readiness.",
        "bio": "Rahul helps backend developers understand what changes when code reaches production: observability, deployment, performance, security, and reliable operational habits.",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
        "expertise": ["Django", "Cloud & DevOps", "API Design"],
        "languages": ["English", "Hindi"],
        "years": 12,
        "students": 305,
        "sessions": 460,
        "featured": False,
        "availability": "available",
    },
    {
        "name": ("Farah", "Khan"),
        "slug": "farah-khan",
        "job_title": "Security Engineer",
        "company": "Payments Security",
        "headline": "Application security, threat modelling, and security career paths.",
        "bio": "Farah makes security concrete for developers. Mentoring sessions connect secure design principles to real application flows, portfolio projects, and entry-level security roles.",
        "avatar": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=900&q=85",
        "expertise": ["Cyber Security", "Application Security", "Career Growth"],
        "languages": ["English", "Hindi", "Urdu"],
        "years": 8,
        "students": 240,
        "sessions": 390,
        "featured": False,
        "availability": "waitlist",
    },
    {
        "name": ("Karthik", "Menon"),
        "slug": "karthik-menon",
        "job_title": "Engineering Manager",
        "company": "Developer Productivity",
        "headline": "Leadership, code reviews, technical communication, and growth.",
        "bio": "Karthik mentors engineers navigating their first role, promotion, or leadership transition. He focuses on feedback, prioritisation, communication, and sustainable technical growth.",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
        "expertise": ["Engineering Leadership", "Code Reviews", "Career Growth"],
        "languages": ["English", "Malayalam", "Hindi"],
        "years": 14,
        "students": 455,
        "sessions": 610,
        "featured": False,
        "availability": "unavailable",
    },
]


class Command(BaseCommand):
    help = "Create or refresh public mentor profiles and mentor review demo data."

    @transaction.atomic
    def handle(self, *args, **options):
        now = timezone.now()
        profiles = []

        for order, data in enumerate(MENTORS, start=1):
            first_name, last_name = data["name"]
            username = f"demo.mentor.{data['slug']}@example.com"
            user, _ = CustomUser.objects.update_or_create(
                username=username,
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": username,
                    "role": "faculty",
                    "is_active": True,
                },
            )
            profile, _ = FacultyProfile.objects.update_or_create(
                slug=data["slug"],
                defaults={
                    "user": user,
                    "display_name": f"{first_name} {last_name}",
                    "headline": data["headline"],
                    "bio": data["bio"],
                    "avatar": data["avatar"],
                    "expertise": data["expertise"],
                    "job_title": data["job_title"],
                    "company": data["company"],
                    "location": "India · Remote",
                    "languages": data["languages"],
                    "experience": [
                        {
                            "role": data["job_title"],
                            "company": data["company"],
                            "period": "2021 – Present",
                            "description": "Leads complex projects and mentors engineers across product teams.",
                        },
                        {
                            "role": "Software Engineer",
                            "company": "Product Engineering",
                            "period": "Earlier",
                            "description": "Built and operated customer-facing systems in multidisciplinary teams.",
                        },
                    ],
                    "achievements": [
                        {
                            "title": f"{data['sessions']}+ mentoring sessions",
                            "description": "Practical one-to-one guidance across projects, interviews, and career decisions.",
                        },
                        {
                            "title": "Industry practitioner",
                            "description": "Mentoring grounded in current engineering work and hiring expectations.",
                        },
                    ],
                    "linkedin_url": "https://www.linkedin.com/",
                    "github_url": "https://github.com/",
                    "website_url": "",
                    "booking_url": "",
                    "availability": data["availability"],
                    "session_duration_minutes": 60,
                    "session_price_paise": 149900,
                    "years_experience": data["years"],
                    "students_mentored": data["students"],
                    "sessions_completed": data["sessions"],
                    "is_verified": True,
                    "is_featured": data["featured"],
                    "is_public": True,
                    "display_order": order,
                },
            )
            profiles.append(profile)

        review_students = []
        for index, name in enumerate(
            ["Priya Sharma", "Dev Patel", "Sneha Bose", "Aditya Singh"], start=1
        ):
            first_name, last_name = name.split(" ", 1)
            student, _ = CustomUser.objects.update_or_create(
                username=f"demo.mentee.{index}@example.com",
                defaults={
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": f"demo.mentee.{index}@example.com",
                    "role": "student",
                    "is_active": True,
                },
            )
            review_students.append(student)

        for mentor_index, profile in enumerate(profiles):
            content_type = ContentType.objects.get_for_model(profile)
            for review_index in range(2):
                student = review_students[(mentor_index + review_index) % len(review_students)]
                Review.objects.update_or_create(
                    student=student,
                    content_type=content_type,
                    object_id=profile.pk,
                    defaults={
                        "rating": 5 if review_index == 0 else 4,
                        "title": "Specific, practical guidance",
                        "comment": (
                            f"{profile.display_name} understood my context quickly and "
                            "gave me clear next steps I could apply to my project that week."
                        ),
                        "sentiments": ["great mentor", "practical feedback"],
                        "status": Review.Status.PUBLISHED,
                        "is_verified": True,
                        "helpful_count": 8 + mentor_index + review_index,
                        "published_at": now
                        - timedelta(days=(mentor_index * 14) + review_index + 1),
                    },
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Mentor demo data ready: {len(profiles)} profiles and "
                f"{len(profiles) * 2} reviews."
            )
        )
