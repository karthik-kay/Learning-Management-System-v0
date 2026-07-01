from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import transaction


SEED_COMMANDS = (
    "seed_faq_demo",
    "seed_blog_demo",
    "seed_success_story_demo",
    "seed_mentor_demo",
    "seed_certification_demo",
    "seed_review_demo",
    "seed_event_demo",
)


class Command(BaseCommand):
    help = (
        "Seed the public manager-demo pages without creating institution, "
        "enrollment, payment, or student-dashboard activity."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Run every seed command, then roll back the database transaction.",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]

        with transaction.atomic():
            for command_name in SEED_COMMANDS:
                self.stdout.write(f"Running {command_name}...")
                call_command(
                    command_name,
                    stdout=self.stdout,
                    stderr=self.stderr,
                )

            if dry_run:
                transaction.set_rollback(True)

        if dry_run:
            self.stdout.write(
                self.style.WARNING(
                    "Public demo seed dry run completed; all database changes "
                    "were rolled back."
                )
            )
            return

        self.stdout.write(
            self.style.SUCCESS(
                "Public demo pages seeded successfully: FAQs, blog posts, "
                "success stories, mentors, certifications, reviews, and events."
            )
        )
