from django.core.management.base import BaseCommand

from public_content.models import FAQ


FAQS = {
    "Admissions": [
        (
            "Who can apply to LearnerSlate programmes?",
            "LearnerSlate programmes are designed for students, recent graduates, career switchers, and working professionals. Each programme publishes its own prerequisites, so you can compare your current experience with the expected starting point before applying. [Explore available programmes](/programs) to find the most suitable route.",
        ),
        (
            "Do I need a computer science degree?",
            "No. Many learning paths are suitable for people from non-computer-science backgrounds. Some advanced tracks expect basic programming or mathematics, but foundation routes can help you build those skills first. Read the prerequisites on the programme page and speak with admissions if you are unsure.",
        ),
        (
            "What happens after I submit an application?",
            "The admissions team reviews your goals, background, availability, and preferred programme. If the programme is a potential fit, they arrange a short conversation to clarify expectations and answer questions. You then receive the relevant cohort, fee, and onboarding information before making a decision.",
        ),
        (
            "Can I join while studying or working full-time?",
            "Yes. Several programmes are structured around evening, weekend, or blended learning. You should still reserve consistent weekly time for lessons, projects, and mentor feedback. Check the schedule and workload shown on the programme page before choosing a cohort.",
        ),
    ],
    "Programs & Curriculum": [
        (
            "How are programmes different from individual courses?",
            "A course focuses on a defined skill or subject. A programme combines multiple courses, projects, assessments, mentoring, and career preparation around a larger outcome. If you need focused upskilling, browse [courses](/courses); if you want a structured pathway, explore [programmes](/programs).",
        ),
        (
            "Are the projects based on real workplace problems?",
            "Projects are designed around realistic constraints, trade-offs, and deliverables rather than isolated tutorial steps. Depending on the track, you may build applications, dashboards, deployment pipelines, security reviews, or AI workflows. Project requirements and evaluation rubrics are provided during the programme.",
        ),
        (
            "How much mentor support will I receive?",
            "Support varies by programme but can include live sessions, project reviews, doubt-clearing, office hours, and structured feedback. The programme page explains the delivery format and included support. You can also explore the [mentor directory](/mentors) to understand the expertise represented.",
        ),
        (
            "Can I change tracks after starting?",
            "Track changes depend on cohort timing, completed modules, available seats, and overlap between curricula. Contact the learner-support team as early as possible. They will review your progress and explain whether a transfer, pause, or future cohort is the most sensible option.",
        ),
    ],
    "Payments & EMI": [
        (
            "What payment methods are accepted?",
            "Available payment methods are shown during checkout and may include supported cards, bank transfers, and online payment options. Method availability can vary by programme and location. Never transfer money using details that were not provided through an official LearnerSlate payment flow.",
        ),
        (
            "Are EMI or instalment plans available?",
            "Selected programmes may offer instalment or financing options, subject to eligibility and the terms of the payment provider. Fees, repayment periods, and applicable charges should be reviewed before confirmation. The dedicated EMI page will contain the latest programme-specific financing information.",
        ),
        (
            "Can programme fees change after enrolment?",
            "The price confirmed for your enrolment is recorded during checkout. Optional services, extensions, retakes, or later purchases may carry separate fees where applicable. Review the order summary and programme terms before payment, and keep the invoice or receipt for your records.",
        ),
        (
            "What is the refund policy?",
            "Refund eligibility depends on the purchase, access already provided, elapsed time, and published programme conditions. Some completed services or issued certificates may not be refundable. Read the full [refund policy](/refund-policy) before enrolling, or contact support with your order details.",
        ),
    ],
    "Placements": [
        (
            "Does LearnerSlate guarantee a job?",
            "No learning provider can responsibly guarantee an employment outcome. LearnerSlate can provide career preparation, portfolio feedback, interview practice, and access to relevant opportunities where available. Hiring decisions remain with employers and depend on skill evidence, performance, eligibility, and market conditions.",
        ),
        (
            "What placement support is included?",
            "Support can include portfolio review, resume guidance, mock interviews, role targeting, and introductions to suitable hiring opportunities. The exact support depends on the programme. Explore [learner success stories](/success-stories) to see how projects and preparation contributed to different outcomes.",
        ),
        (
            "When does placement preparation begin?",
            "Career preparation works best alongside skill development, not only after the final module. Learners may begin documenting projects, improving profiles, and practising communication during the programme. Formal placement activities depend on readiness milestones and the structure of the selected programme.",
        ),
        (
            "Can career switchers receive placement support?",
            "Yes. Career switchers often need additional help translating previous experience into relevant strengths and explaining a non-linear journey. Support focuses on demonstrable projects, transferable skills, realistic role targeting, and clear interview narratives rather than asking learners to hide their earlier background.",
        ),
    ],
    "Certifications": [
        (
            "How do I earn a LearnerSlate certificate?",
            "Certificates are issued after the published completion and assessment requirements are satisfied. These may include lessons, practical projects, skill checks, attendance, or a final review. Open a certification page to see its specific requirements, projects, and assessment methods before beginning.",
        ),
        (
            "Can employers verify my certificate?",
            "Yes. Earned certificates receive a unique credential identifier that can be checked through the public verification flow. The verification record confirms key details such as ownership, course, and issue date without exposing private learning data. Use the [verification page](/verify) when it becomes available.",
        ),
        (
            "Is a certificate issued for every course?",
            "Not every learning activity automatically results in a certificate. Eligibility depends on the course or programme and its completion requirements. The relevant product page indicates whether certification is included. You can browse the [certification library](/certifications) for currently published credentials.",
        ),
        (
            "What happens if I do not pass an assessment?",
            "Retake and remediation options depend on the certification and assessment policy. You may be asked to revise a project, repeat a skill check, or wait for another assessment window. Feedback should explain which requirements remain incomplete and what evidence is needed next.",
        ),
    ],
    "Platform & Technical": [
        (
            "What device and browser should I use?",
            "Use a modern desktop or laptop with an up-to-date version of Chrome, Edge, Firefox, or Safari. Practical programming tracks may require additional memory, storage, and locally installed tools. Mobile devices are useful for viewing content but may not support every project workflow.",
        ),
        (
            "What should I do if a lesson or assessment will not load?",
            "Refresh the page, confirm your internet connection, disable interfering browser extensions, and try a private window or another supported browser. If the issue continues, capture the page URL, time, browser version, and a screenshot before contacting the [support centre](/support).",
        ),
        (
            "Can I access learning content on mobile?",
            "Many reading, video, discussion, and progress features can work on a mobile browser. Coding environments, large project files, proctored assessments, and detailed reviews are usually better on a laptop or desktop. Individual activities may display their own device requirements.",
        ),
        (
            "How do I report an account or security problem?",
            "Do not share passwords, verification codes, or payment credentials. Contact support from the email associated with your account and describe the issue without including sensitive secrets. For suspected unauthorised access, change your password immediately and mention the approximate time of the activity.",
        ),
    ],
}


class Command(BaseCommand):
    help = "Create or update the public cross-site FAQ library."

    def handle(self, *args, **options):
        display_order = 1
        for category, items in FAQS.items():
            for question, answer in items:
                FAQ.objects.update_or_create(
                    question=question,
                    defaults={
                        "answer": answer,
                        "category": category,
                        "status": FAQ.Status.PUBLISHED,
                        "display_order": display_order,
                    },
                )
                display_order += 1

        total = sum(len(items) for items in FAQS.values())
        self.stdout.write(self.style.SUCCESS(f"Seeded {total} public FAQs."))
