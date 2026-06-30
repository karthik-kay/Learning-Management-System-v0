from datetime import timedelta

from django.contrib.contenttypes.models import ContentType
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from courses.models import Course
from programs.models import LearningProgram
from reviews.models import Review
from users.models import CustomUser


TARGETS = [
    {
        "kind": "course",
        "slug": "full-stack-advanced-demo",
        "title": "Full Stack Advanced",
        "description": "Production-focused full-stack engineering.",
        "domain": "Full Stack",
    },
    {
        "kind": "course",
        "slug": "data-science-ml-demo",
        "title": "Data Science and Machine Learning",
        "description": "Applied analytics and machine learning workflows.",
        "domain": "Data Science",
    },
    {
        "kind": "course",
        "slug": "cloud-devops-demo",
        "title": "Cloud and DevOps",
        "description": "Cloud infrastructure, automation, and delivery.",
        "domain": "Cloud & DevOps",
    },
    {
        "kind": "course",
        "slug": "cyber-security-demo",
        "title": "Cyber Security Foundations",
        "description": "Practical defensive security foundations.",
        "domain": "Cyber Security",
    },
    {
        "kind": "program",
        "slug": "career-accelerator-demo",
        "title": "Software Career Accelerator",
        "short_description": "Projects, mentoring, and placement preparation.",
        "program_type": LearningProgram.ProgramType.FAST_TRACK,
    },
]


REVIEWS = [
    {
        "name": ("Ravi", "Kumar"),
        "target": "full-stack-advanced-demo",
        "rating": 5,
        "title": "The projects made the difference",
        "comment": (
            "I got placed at a Hyderabad startup within six months of completing "
            "the program. The live projects and mock interviews were the real "
            "differentiators—not just theory dumps like other platforms."
        ),
        "sentiments": ["hands-on projects", "great mentors", "fast placement"],
        "helpful_count": 42,
        "featured": True,
    },
    {
        "name": ("Ananya", "Prasad"),
        "target": "data-science-ml-demo",
        "rating": 5,
        "title": "A career switch that finally felt possible",
        "comment": (
            "I came from banking, and my mentor mapped every assignment to skills "
            "I already had. I left with a portfolio I could explain confidently "
            "and moved into a data role."
        ),
        "sentiments": ["great mentors", "clear curriculum", "career support"],
        "helpful_count": 38,
        "featured": True,
    },
    {
        "name": ("Siddharth", "K."),
        "target": "cloud-devops-demo",
        "rating": 5,
        "title": "Best investment I made",
        "comment": (
            "The AWS labs, Linux practice, and deployment reviews helped me move "
            "from support work into a junior cloud role in seven months."
        ),
        "sentiments": ["hands-on projects", "clear curriculum"],
        "helpful_count": 29,
    },
    {
        "name": ("Neha", "V."),
        "target": "data-science-ml-demo",
        "rating": 4,
        "title": "Strong curriculum and thoughtful mentoring",
        "comment": (
            "The capstone genuinely challenged me, and mentor feedback was specific. "
            "A few recorded sessions could be tighter, but the live support was good."
        ),
        "sentiments": ["great mentors", "good support", "clear curriculum"],
        "helpful_count": 26,
    },
    {
        "name": ("Mohammed", "R."),
        "target": "full-stack-advanced-demo",
        "rating": 5,
        "title": "A clear path from non-CS to developer",
        "comment": (
            "Coming from a non-CS background, the pacing was right. I built each "
            "layer instead of copying code and accepted an 8.5 LPA role in Bengaluru."
        ),
        "sentiments": ["clear curriculum", "fast placement"],
        "helpful_count": 31,
    },
    {
        "name": ("Priya", "Sharma"),
        "target": "career-accelerator-demo",
        "rating": 5,
        "title": "Accountability without unnecessary pressure",
        "comment": (
            "Weekly reviews kept me moving while the roadmap stayed realistic around "
            "college work. Resume feedback and interview practice were excellent."
        ),
        "sentiments": ["career support", "good support", "great mentors"],
        "helpful_count": 24,
    },
    {
        "name": ("Arjun", "Nair"),
        "target": "cyber-security-demo",
        "rating": 4,
        "title": "Practical security, not just definitions",
        "comment": (
            "The labs made OWASP and authentication risks concrete. I wanted more "
            "advanced network material, but the foundations were genuinely useful."
        ),
        "sentiments": ["hands-on projects", "clear curriculum"],
        "helpful_count": 18,
    },
    {
        "name": ("Lakshmi", "Iyer"),
        "target": "career-accelerator-demo",
        "rating": 5,
        "title": "Mentors who remember your context",
        "comment": (
            "The mentor did not give generic advice. Every review connected back to "
            "my target role and the weak spots in my portfolio."
        ),
        "sentiments": ["great mentors", "career support"],
        "helpful_count": 22,
    },
    {
        "name": ("Dev", "Patel"),
        "target": "full-stack-advanced-demo",
        "rating": 4,
        "title": "Demanding, but worth the work",
        "comment": (
            "The program expects consistency. Some weeks were intense, but code "
            "reviews showed me exactly where my engineering habits needed work."
        ),
        "sentiments": ["hands-on projects", "great mentors"],
        "helpful_count": 17,
    },
    {
        "name": ("Sneha", "Bose"),
        "target": "data-science-ml-demo",
        "rating": 3,
        "title": "Good content with room to improve pacing",
        "comment": (
            "The projects and mentor sessions were strong. The statistics section "
            "moved quickly for beginners, so I needed extra study time."
        ),
        "sentiments": ["hands-on projects", "good support"],
        "helpful_count": 15,
    },
    {
        "name": ("Aditya", "Singh"),
        "target": "cloud-devops-demo",
        "rating": 4,
        "title": "Deployment finally makes sense",
        "comment": (
            "CI/CD stopped feeling like magic once we built pipelines and broke them "
            "ourselves. The troubleshooting sessions were especially useful."
        ),
        "sentiments": ["hands-on projects", "good support"],
        "helpful_count": 19,
    },
    {
        "name": ("Farah", "Khan"),
        "target": "career-accelerator-demo",
        "rating": 5,
        "title": "The confidence came from evidence",
        "comment": (
            "Instead of motivational speeches, the team helped me build proof: two "
            "projects, a clean resume, and interview stories I could defend."
        ),
        "sentiments": ["career support", "fast placement", "great mentors"],
        "helpful_count": 27,
    },
]


class Command(BaseCommand):
    help = "Create or refresh published demo reviews for the public reviews page."

    @transaction.atomic
    def handle(self, *args, **options):
        target_map = {}

        for target_data in TARGETS:
            data = target_data.copy()
            kind = data.pop("kind")
            slug = data.pop("slug")

            if kind == "course":
                target, _ = Course.objects.update_or_create(
                    slug=slug,
                    defaults={
                        **data,
                        "is_active": True,
                    },
                )
            else:
                target, _ = LearningProgram.objects.update_or_create(
                    slug=slug,
                    defaults={
                        **data,
                        "is_published": True,
                        "duration_weeks": 24,
                        "total_hours": 320,
                    },
                )

            target_map[slug] = target

        now = timezone.now()
        created_count = 0
        updated_count = 0

        for index, review_data in enumerate(REVIEWS, start=1):
            first_name, last_name = review_data["name"]
            username = (
                f"demo.review.{first_name}.{last_name}".lower()
                .replace(" ", ".")
                .replace("..", ".")
            )
            student, _ = CustomUser.objects.update_or_create(
                username=username,
                defaults={
                    "first_name": first_name,
                    "last_name": last_name.replace(".", ""),
                    "email": f"{username}@example.com",
                    "role": "student",
                    "is_active": True,
                },
            )
            target = target_map[review_data["target"]]
            content_type = ContentType.objects.get_for_model(target)

            _, created = Review.objects.update_or_create(
                student=student,
                content_type=content_type,
                object_id=target.pk,
                defaults={
                    "rating": review_data["rating"],
                    "title": review_data["title"],
                    "comment": review_data["comment"],
                    "sentiments": review_data["sentiments"],
                    "status": Review.Status.PUBLISHED,
                    "is_verified": True,
                    "is_featured": review_data.get("featured", False),
                    "helpful_count": review_data["helpful_count"],
                    "published_at": now - timedelta(days=index * 12),
                },
            )
            created_count += int(created)
            updated_count += int(not created)

        self.stdout.write(
            self.style.SUCCESS(
                f"Review demo data ready: {len(target_map)} targets, "
                f"{created_count} reviews created, {updated_count} reviews updated."
            )
        )
