from datetime import timedelta
from textwrap import dedent

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from public_content.models import BlogCategory, BlogPost


CATEGORIES = [
    {
        "name": "Engineering",
        "slug": "engineering",
        "description": "Practical software engineering, architecture, and delivery.",
        "display_order": 1,
    },
    {
        "name": "Career Growth",
        "slug": "career-growth",
        "description": "Career decisions, interviews, portfolios, and workplace growth.",
        "display_order": 2,
    },
    {
        "name": "Learning Strategy",
        "slug": "learning-strategy",
        "description": "Better systems for learning difficult technical skills.",
        "display_order": 3,
    },
    {
        "name": "AI & Data",
        "slug": "ai-data",
        "description": "Applied AI, data workflows, and modern tooling.",
        "display_order": 4,
    },
    {
        "name": "Student Stories",
        "slug": "student-stories",
        "description": "Honest journeys from learners building real careers.",
        "display_order": 5,
    },
]


POSTS = [
    {
        "title": "The Project-First Roadmap to Becoming a Full-Stack Developer",
        "slug": "project-first-full-stack-roadmap",
        "excerpt": (
            "A practical sequence for learning frontend, backend, databases, and "
            "deployment without getting trapped in endless tutorials."
        ),
        "author_name": "Ananya Rao",
        "category": "engineering",
        "tags": ["full-stack", "roadmap", "projects"],
        "reading_time_minutes": 8,
        "is_featured": True,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Full-stack development feels enormous because newcomers treat every "
            "tool as a separate subject. A project-first roadmap connects those "
            "tools around one product, making each new concept easier to retain."
        ),
        "steps": [
            (
                "Build one useful interface",
                "Start with semantic HTML, responsive CSS, and JavaScript state. "
                "Ship a small interface before adding a framework.",
            ),
            (
                "Add a real API",
                "Introduce HTTP, validation, authentication, and error handling "
                "through a backend that serves the same product.",
            ),
            (
                "Persist and deploy",
                "Model data in PostgreSQL, write migrations, add tests, and deploy "
                "the complete system so other people can use it.",
            ),
        ],
        "mistake": (
            "Collecting courses is not the same as building skill. If a week passes "
            "without producing code you can demonstrate, reduce the amount of "
            "content and increase the amount of deliberate practice."
        ),
        "next": (
            "Choose one problem you understand, define a two-week version, and "
            "publish the first working slice before expanding the stack."
        ),
    },
    {
        "title": "How to Build a Portfolio Recruiters Can Evaluate in Five Minutes",
        "slug": "portfolio-recruiters-can-evaluate",
        "excerpt": (
            "Turn projects into clear evidence of judgment, technical depth, and "
            "delivery instead of presenting another gallery of screenshots."
        ),
        "author_name": "Meera Iyer",
        "category": "career-growth",
        "tags": ["portfolio", "jobs", "career"],
        "reading_time_minutes": 6,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "A reviewer rarely has time to reverse-engineer why a project matters. "
            "Your portfolio must make the problem, constraints, decisions, and "
            "result understandable at a glance."
        ),
        "steps": [
            (
                "Lead with the outcome",
                "Explain who the project helps and what changed because you built it.",
            ),
            (
                "Show engineering decisions",
                "Document one meaningful tradeoff, one difficult bug, and one choice "
                "you would revisit with more time.",
            ),
            (
                "Make verification effortless",
                "Provide a working demo, a readable repository, setup instructions, "
                "and a short walkthrough.",
            ),
        ],
        "mistake": (
            "Listing technologies without explaining their purpose turns the page "
            "into a keyword cloud. Evidence is stronger than inventory."
        ),
        "next": (
            "Rewrite one project today as a concise case study: problem, role, "
            "decisions, result, and what you learned."
        ),
    },
    {
        "title": "A Weekly Learning System That Survives Busy Semesters",
        "slug": "weekly-learning-system-busy-semesters",
        "excerpt": (
            "A sustainable planning method for balancing classes, coding practice, "
            "projects, and recovery without relying on motivation."
        ),
        "author_name": "Karthik Menon",
        "category": "learning-strategy",
        "tags": ["productivity", "learning", "students"],
        "reading_time_minutes": 7,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1456324504439-367cee3b3c32"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Ambitious plans usually fail at the first stressful week. A resilient "
            "system starts with a minimum commitment and expands only when time and "
            "energy are genuinely available."
        ),
        "steps": [
            (
                "Set a weekly outcome",
                "Choose one observable result, such as a deployed feature or ten "
                "reviewed problems, instead of a vague number of study hours.",
            ),
            (
                "Protect three focused blocks",
                "Schedule a few high-quality sessions before filling the week with "
                "optional tasks.",
            ),
            (
                "Review evidence on Sunday",
                "Look at commits, notes, solved problems, and demos. Adjust the next "
                "week from evidence rather than guilt.",
            ),
        ],
        "mistake": (
            "A schedule packed to one hundred percent capacity has no room for real "
            "life. Leave deliberate slack for assignments, illness, and rest."
        ),
        "next": (
            "Define your minimum viable week and put its three most important "
            "sessions on the calendar."
        ),
    },
    {
        "title": "What RAG Actually Solves—and Where It Breaks",
        "slug": "what-rag-solves-and-where-it-breaks",
        "excerpt": (
            "A grounded explanation of retrieval-augmented generation, its useful "
            "failure modes, and the evaluations teams should run before launch."
        ),
        "author_name": "Rohan Desai",
        "category": "ai-data",
        "tags": ["rag", "llm", "ai"],
        "reading_time_minutes": 9,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1677442136019-21780ecad995"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "RAG can ground a model in changing or private information, but it does "
            "not automatically make answers correct. Retrieval quality, document "
            "structure, and evaluation still decide whether the system is useful."
        ),
        "steps": [
            (
                "Measure retrieval separately",
                "Check whether the needed evidence appears in the retrieved chunks "
                "before judging the generated answer.",
            ),
            (
                "Design around source quality",
                "Clean documents, preserve meaningful structure, and attach metadata "
                "that supports filtering and citation.",
            ),
            (
                "Evaluate real user questions",
                "Build a small test set containing common, ambiguous, adversarial, "
                "and unanswerable requests.",
            ),
        ],
        "mistake": (
            "Changing embedding models repeatedly will not repair incomplete source "
            "material or unclear product requirements."
        ),
        "next": (
            "Take twenty real questions and label the evidence each answer requires. "
            "That set becomes the beginning of an evaluation harness."
        ),
    },
    {
        "title": "From Tutorial Projects to Production Thinking",
        "slug": "tutorial-projects-to-production-thinking",
        "excerpt": (
            "Seven questions that transform a working demo into a system you can "
            "explain, test, operate, and improve."
        ),
        "author_name": "Ananya Rao",
        "category": "engineering",
        "tags": ["production", "architecture", "projects"],
        "reading_time_minutes": 7,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Tutorials optimize for a smooth path to a visible result. Production "
            "engineering begins where that path ends: failures, data integrity, "
            "security, observability, and maintenance."
        ),
        "steps": [
            (
                "Define failure behavior",
                "Decide what users see when dependencies are slow, requests fail, or "
                "data is incomplete.",
            ),
            (
                "Protect important boundaries",
                "Validate inputs, authorize actions, and make repeated operations "
                "safe wherever possible.",
            ),
            (
                "Make the system observable",
                "Add structured logs, useful metrics, and enough context to diagnose "
                "a problem without reproducing it locally.",
            ),
        ],
        "mistake": (
            "Premature complexity is not production thinking. Reliability starts "
            "with clear behavior and a small number of well-understood components."
        ),
        "next": (
            "Pick your strongest project and write down its five most likely failure "
            "modes before adding another feature."
        ),
    },
    {
        "title": "The Interview Debrief That Makes Every Rejection Useful",
        "slug": "interview-debrief-every-rejection-useful",
        "excerpt": (
            "A calm post-interview process for separating signal from emotion and "
            "turning weak moments into focused practice."
        ),
        "author_name": "Meera Iyer",
        "category": "career-growth",
        "tags": ["interviews", "career", "reflection"],
        "reading_time_minutes": 5,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Memory becomes less accurate after an intense interview. A short, "
            "structured debrief preserves what happened and prevents one rejection "
            "from becoming a vague judgment about your ability."
        ),
        "steps": [
            (
                "Record the questions",
                "Write down prompts, follow-ups, and the points where the interviewer "
                "redirected the conversation.",
            ),
            (
                "Separate knowledge from communication",
                "Identify whether you lacked the concept, chose a weak approach, or "
                "failed to explain reasoning clearly.",
            ),
            (
                "Create one practice task",
                "Convert the largest gap into a specific exercise you can complete "
                "and review within the next week.",
            ),
        ],
        "mistake": (
            "Replaying the entire conversation without producing an action only "
            "strengthens anxiety. Debriefs should be brief and operational."
        ),
        "next": (
            "Create a reusable debrief template before your next interview and fill "
            "it in within thirty minutes of finishing."
        ),
    },
    {
        "title": "Why Spaced Repetition Is Not Just for Flashcards",
        "slug": "spaced-repetition-beyond-flashcards",
        "excerpt": (
            "Use retrieval, reconstruction, and spaced project work to remember "
            "technical concepts long after a course ends."
        ),
        "author_name": "Karthik Menon",
        "category": "learning-strategy",
        "tags": ["memory", "practice", "learning"],
        "reading_time_minutes": 6,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Technical knowledge fades when recognition is mistaken for recall. "
            "Spacing works best when each review asks you to reconstruct an idea or "
            "apply it in a slightly different context."
        ),
        "steps": [
            (
                "Recall before reviewing",
                "Explain the idea from memory, sketch the architecture, or write the "
                "function before opening your notes.",
            ),
            (
                "Revisit through variation",
                "Solve a related problem or rebuild the feature under a new "
                "constraint instead of repeating the same example.",
            ),
            (
                "Keep a small review queue",
                "Schedule only the concepts that matter to your current goals and "
                "remove items that no longer deserve attention.",
            ),
        ],
        "mistake": (
            "Turning every sentence into a card creates administrative work rather "
            "than useful retrieval practice."
        ),
        "next": (
            "Select five concepts from your current course and schedule active "
            "recall sessions across the next three weeks."
        ),
    },
    {
        "title": "SQL Before Dashboards: A Better Data Analytics Sequence",
        "slug": "sql-before-dashboards-data-analytics",
        "excerpt": (
            "Learn to interrogate data and validate assumptions before polishing "
            "charts that may be confidently wrong."
        ),
        "author_name": "Rohan Desai",
        "category": "ai-data",
        "tags": ["sql", "analytics", "data"],
        "reading_time_minutes": 8,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Dashboards are persuasive, which makes incorrect definitions dangerous. "
            "SQL forces analysts to understand grain, joins, missing values, and "
            "business rules before choosing a visualization."
        ),
        "steps": [
            (
                "Define the metric in words",
                "State the population, time window, exclusions, and unit before "
                "writing a query.",
            ),
            (
                "Validate intermediate results",
                "Inspect row counts, duplicates, nulls, and a handful of known "
                "entities after each important transformation.",
            ),
            (
                "Visualize the decision",
                "Choose the simplest chart that helps someone compare, diagnose, or "
                "act on the result.",
            ),
        ],
        "mistake": (
            "A polished chart cannot compensate for an unstable metric definition or "
            "an accidental many-to-many join."
        ),
        "next": (
            "Take one dashboard metric and write a plain-language specification that "
            "another analyst could independently reproduce."
        ),
    },
    {
        "title": "How Priya Turned One Campus Problem into Her First Developer Role",
        "slug": "priya-campus-problem-first-developer-role",
        "excerpt": (
            "A learner story about narrowing scope, speaking with users, and using "
            "one deeply understood project to lead technical interviews."
        ),
        "author_name": "LearnerSlate Editorial",
        "category": "student-stories",
        "tags": ["student-story", "projects", "placements"],
        "reading_time_minutes": 6,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "Priya did not begin with a perfect resume or a novel startup idea. She "
            "began with a scheduling problem her classmates experienced every week "
            "and treated them as real users."
        ),
        "steps": [
            (
                "Narrow the first release",
                "She replaced a long feature list with one reliable flow for finding "
                "and exchanging available lab slots.",
            ),
            (
                "Collect evidence",
                "Short user interviews and usage notes gave her concrete reasons for "
                "each design and data-model decision.",
            ),
            (
                "Tell the engineering story",
                "In interviews she explained tradeoffs, failures, and improvements "
                "instead of reciting framework definitions.",
            ),
        ],
        "mistake": (
            "Her early version tried to serve every department and stalled. Progress "
            "returned when she focused on one cohort and one painful workflow."
        ),
        "next": (
            "Look for a repeated problem within a community you can access, then talk "
            "to three people before choosing the solution."
        ),
    },
    {
        "title": "Your First Open-Source Contribution Should Be Boring",
        "slug": "first-open-source-contribution-boring",
        "excerpt": (
            "Why documentation, tests, reproduction cases, and tiny fixes are the "
            "best route into unfamiliar production codebases."
        ),
        "author_name": "Ananya Rao",
        "category": "engineering",
        "tags": ["open-source", "github", "collaboration"],
        "reading_time_minutes": 6,
        "cover_image_url": (
            "https://images.unsplash.com/photo-1556075798-4825dfaaf498"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "why": (
            "The hardest part of contributing is rarely typing the final change. It "
            "is learning the repository, reproducing behavior, and communicating "
            "with maintainers without creating extra work."
        ),
        "steps": [
            (
                "Choose an active repository",
                "Look for recent merges, clear contribution instructions, and issues "
                "where maintainers respond constructively.",
            ),
            (
                "Prove the problem first",
                "Reproduce the issue, record the environment, and add a failing test "
                "or concise explanation before proposing a broad solution.",
            ),
            (
                "Keep the patch narrow",
                "Avoid unrelated formatting and refactors so reviewers can reason "
                "about the change quickly.",
            ),
        ],
        "mistake": (
            "Starting with a large feature multiplies unknowns and makes review slow. "
            "A small merged contribution teaches the workflow far better."
        ),
        "next": (
            "Find one project you already use and improve a setup instruction, test "
            "case, error message, or well-scoped beginner issue."
        ),
    },
]


def build_body(post):
    step_sections = "\n\n".join(
        f"### {index}. {title}\n\n{description}"
        for index, (title, description) in enumerate(post["steps"], start=1)
    )

    return dedent(
        f"""
        {post["excerpt"]}

        ## Why this matters

        {post["why"]}

        ## A practical framework

        {step_sections}

        ## A common mistake

        > {post["mistake"]}

        ## What to do next

        {post["next"]}

        Technical growth becomes much easier to sustain when the next action is
        small, observable, and connected to a real outcome. Save this guide, try
        the framework, and adapt it to the constraints of your own learning.
        """
    ).strip()


class Command(BaseCommand):
    help = "Create or refresh demo categories and posts for the public blog."

    @transaction.atomic
    def handle(self, *args, **options):
        categories = {}

        for category_data in CATEGORIES:
            category, _ = BlogCategory.objects.update_or_create(
                slug=category_data["slug"],
                defaults=category_data,
            )
            categories[category.slug] = category

        now = timezone.now()
        created_count = 0
        updated_count = 0

        for index, post_data in enumerate(POSTS, start=1):
            category_slug = post_data["category"]
            defaults = {
                "title": post_data["title"],
                "excerpt": post_data["excerpt"],
                "body": build_body(post_data),
                "cover_image_url": post_data["cover_image_url"],
                "author_name": post_data["author_name"],
                "category": categories[category_slug],
                "tags": post_data["tags"],
                "reading_time_minutes": post_data["reading_time_minutes"],
                "is_featured": post_data.get("is_featured", False),
                "display_order": index,
                "status": BlogPost.Status.PUBLISHED,
                "published_at": now - timedelta(days=index * 3),
                "meta_title": post_data["title"],
                "meta_description": post_data["excerpt"],
            }
            _, created = BlogPost.objects.update_or_create(
                slug=post_data["slug"],
                defaults=defaults,
            )
            created_count += int(created)
            updated_count += int(not created)

        self.stdout.write(
            self.style.SUCCESS(
                f"Blog demo data ready: {len(categories)} categories, "
                f"{created_count} posts created, {updated_count} posts updated."
            )
        )
