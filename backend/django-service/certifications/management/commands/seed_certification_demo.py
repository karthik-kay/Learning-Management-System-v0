from django.core.management.base import BaseCommand

from certifications.models import CertificationOffering


CERTIFICATIONS = [
    {
        "slug": "full-stack-software-engineer",
        "title": "Full Stack Software Engineer Certificate",
        "short_description": "Prove end-to-end web engineering through assessed applications and a production-style capstone.",
        "description": "A programme-level credential for learners who demonstrate frontend, backend, database, testing, deployment, and product-delivery skills through practical work.",
        "certification_type": "program",
        "domain": "full-stack",
        "level": "Career-ready",
        "duration": "24 weeks",
        "skills": ["React", "Django", "PostgreSQL", "AWS"],
        "outcomes": ["Build accessible production interfaces", "Design secure APIs and data models", "Deploy and monitor a full-stack application", "Present architectural decisions clearly"],
        "requirements": ["Complete all core modules", "Pass practical assessments", "Submit the capstone project", "Complete the final project review"],
        "assessment_methods": ["Module projects", "Code reviews", "Timed skill checks", "Capstone defence"],
        "projects": ["Multi-role learning platform", "Production deployment capstone"],
        "is_featured": True,
        "sort_order": 1,
    },
    {
        "slug": "ai-engineer-track",
        "title": "AI Engineer Track Certificate",
        "short_description": "Validate applied AI, retrieval, evaluation, and production workflow skills.",
        "description": "A specialist track credential focused on building reliable AI-enabled products rather than isolated notebook demonstrations.",
        "certification_type": "track",
        "domain": "ai",
        "level": "Specialized",
        "duration": "12 weeks",
        "skills": ["Python", "RAG", "NLP", "MLOps"],
        "outcomes": ["Build retrieval-augmented applications", "Evaluate model quality and safety", "Design observable AI workflows", "Ship an applied AI project"],
        "requirements": ["Working Python knowledge", "Complete track assignments", "Meet project evaluation thresholds"],
        "assessment_methods": ["Lab submissions", "Evaluation reports", "Architecture review", "Final product demo"],
        "projects": ["Knowledge assistant with citations", "AI evaluation dashboard"],
        "is_featured": True,
        "sort_order": 2,
    },
    {
        "slug": "dsa",
        "title": "Data Structures and Algorithms Certificate",
        "short_description": "Demonstrate structured problem solving and interview-ready algorithmic thinking.",
        "description": "A focused course credential covering core data structures, algorithm design, complexity analysis, and repeatable problem-solving communication.",
        "certification_type": "course",
        "domain": "full-stack",
        "level": "Foundation",
        "duration": "8 weeks",
        "skills": ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
        "outcomes": ["Select suitable data structures", "Explain time and space complexity", "Solve common algorithm patterns", "Communicate solutions under interview conditions"],
        "requirements": ["Complete weekly problem sets", "Pass two timed assessments", "Reach the minimum practice score"],
        "assessment_methods": ["Coding exercises", "Timed assessments", "Mock interview"],
        "projects": ["Algorithm visualiser", "Problem-pattern portfolio"],
        "is_featured": False,
        "sort_order": 3,
    },
    {
        "slug": "data-analytics-track",
        "title": "Data Analytics Track Certificate",
        "short_description": "Prove you can turn raw data into defensible business insight and clear decisions.",
        "description": "An applied analytics credential spanning SQL, data preparation, visualisation, statistical reasoning, and stakeholder communication.",
        "certification_type": "track",
        "domain": "data",
        "level": "Applied",
        "duration": "10 weeks",
        "skills": ["SQL", "Pandas", "Power BI", "Statistics"],
        "outcomes": ["Clean and model business data", "Build decision-ready dashboards", "Apply statistical reasoning", "Present recommendations to stakeholders"],
        "requirements": ["Complete analytics labs", "Publish a dashboard", "Pass the final case study"],
        "assessment_methods": ["SQL challenges", "Dashboard review", "Case-study presentation"],
        "projects": ["Executive performance dashboard", "Customer-retention analysis"],
        "is_featured": False,
        "sort_order": 4,
    },
    {
        "slug": "cloud-devops",
        "title": "Cloud and DevOps Certificate",
        "short_description": "Validate deployment, automation, container, and production operations fundamentals.",
        "description": "A specialist credential for learners who can package, automate, deploy, and troubleshoot modern applications across a cloud delivery workflow.",
        "certification_type": "track",
        "domain": "devops",
        "level": "Specialized",
        "duration": "10 weeks",
        "skills": ["Docker", "CI/CD", "Linux", "AWS"],
        "outcomes": ["Containerise multi-service applications", "Build reliable delivery pipelines", "Operate core cloud infrastructure", "Diagnose deployment failures"],
        "requirements": ["Basic command-line knowledge", "Complete deployment labs", "Pass the production-readiness review"],
        "assessment_methods": ["Infrastructure labs", "Pipeline review", "Incident simulation", "Final deployment"],
        "projects": ["Automated delivery pipeline", "Cloud-hosted container platform"],
        "is_featured": False,
        "sort_order": 5,
    },
    {
        "slug": "secure-web-development",
        "title": "Secure Web Development Certificate",
        "short_description": "Demonstrate secure authentication, API protection, and defensive development practices.",
        "description": "A practical course credential built around recognising common web risks and applying layered controls throughout application delivery.",
        "certification_type": "course",
        "domain": "security",
        "level": "Practical",
        "duration": "6 weeks",
        "skills": ["OWASP", "JWT", "API Security", "Authentication"],
        "outcomes": ["Identify common application risks", "Implement secure identity flows", "Protect APIs and sensitive data", "Review code for security defects"],
        "requirements": ["Web development fundamentals", "Complete threat-modelling exercises", "Pass the secure-code assessment"],
        "assessment_methods": ["Threat model", "Security labs", "Code review", "Final remediation report"],
        "projects": ["Hardened authentication service", "Web application security audit"],
        "is_featured": False,
        "sort_order": 6,
    },
]


class Command(BaseCommand):
    help = "Create or update public demo certification offerings."

    def handle(self, *args, **options):
        for data in CERTIFICATIONS:
            slug = data["slug"]
            CertificationOffering.objects.update_or_create(
                slug=slug,
                defaults={key: value for key, value in data.items() if key != "slug"},
            )
        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {len(CERTIFICATIONS)} public certification offerings."
            )
        )
