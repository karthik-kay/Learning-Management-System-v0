from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.test import TestCase

from courses.models import Course, Lesson, Module
from users.models import CustomUser

from .models import (
    FeedbackAnswer,
    FeedbackQuestion,
    FeedbackSubmission,
    Review,
)


class ReviewModelTests(TestCase):
    def setUp(self):
        self.student = CustomUser.objects.create_user(
            username="review-student",
            role="student",
            password="test-password",
        )
        self.course = Course.objects.create(
            title="Practical Django",
            description="Build and ship a production API.",
        )
        self.module = Module.objects.create(
            course=self.course,
            title="API foundations",
            order=1,
        )
        self.lesson = Lesson.objects.create(
            module=self.module,
            title="REST fundamentals",
            order=1,
        )

    def content_type_for(self, instance):
        return ContentType.objects.get_for_model(instance)

    def test_public_review_accepts_course_target(self):
        review = Review(
            student=self.student,
            content_type=self.content_type_for(self.course),
            object_id=self.course.id,
            rating=5,
            comment="Clear, practical, and worth the time.",
            status=Review.Status.PUBLISHED,
            sentiments=["clear curriculum", "hands-on projects"],
        )

        review.full_clean()
        review.save()

        self.assertEqual(review.target, self.course)
        self.assertIsNotNone(review.published_at)

    def test_public_review_rejects_lesson_target(self):
        review = Review(
            student=self.student,
            content_type=self.content_type_for(self.lesson),
            object_id=self.lesson.id,
            rating=4,
            comment="Useful lesson.",
        )

        with self.assertRaises(ValidationError):
            review.full_clean()

    def test_review_rating_must_be_between_one_and_five(self):
        review = Review(
            student=self.student,
            content_type=self.content_type_for(self.course),
            object_id=self.course.id,
            rating=6,
            comment="Invalid rating.",
        )

        with self.assertRaises(ValidationError):
            review.full_clean()


class FeedbackModelTests(TestCase):
    def setUp(self):
        self.student = CustomUser.objects.create_user(
            username="feedback-student",
            role="student",
            password="test-password",
        )
        self.course = Course.objects.create(
            title="Frontend Foundations",
            description="Build accessible interfaces.",
        )
        self.module = Module.objects.create(
            course=self.course,
            title="React",
            order=1,
        )
        self.lesson = Lesson.objects.create(
            module=self.module,
            title="Component state",
            order=1,
        )
        self.lesson_type = ContentType.objects.get_for_model(self.lesson)

    def test_private_feedback_accepts_lesson_dimensions(self):
        submission = FeedbackSubmission(
            student=self.student,
            content_type=self.lesson_type,
            object_id=self.lesson.id,
            kind=FeedbackSubmission.Kind.LESSON,
            overall_rating=4,
            dimension_ratings={"content": 5, "pace": 3},
            comment="The example made state transitions click.",
            is_anonymous=True,
        )

        submission.full_clean()
        submission.save()

        self.assertEqual(submission.target, self.lesson)
        self.assertEqual(submission.student_display_name, "Anonymous learner")

    def test_feedback_kind_must_match_target(self):
        submission = FeedbackSubmission(
            student=self.student,
            content_type=self.lesson_type,
            object_id=self.lesson.id,
            kind=FeedbackSubmission.Kind.PROGRAM,
            overall_rating=4,
        )

        with self.assertRaises(ValidationError):
            submission.full_clean()

    def test_dimension_rating_keys_and_values_are_validated(self):
        submission = FeedbackSubmission(
            student=self.student,
            content_type=self.lesson_type,
            object_id=self.lesson.id,
            kind=FeedbackSubmission.Kind.LESSON,
            dimension_ratings={"content": 8, "unknown": 3},
        )

        with self.assertRaises(ValidationError):
            submission.full_clean()

    def test_typed_question_answer_matches_feedback_workflow(self):
        submission = FeedbackSubmission.objects.create(
            student=self.student,
            content_type=self.lesson_type,
            object_id=self.lesson.id,
            kind=FeedbackSubmission.Kind.LESSON,
            overall_rating=4,
        )
        question = FeedbackQuestion.objects.create(
            feedback_kind=FeedbackSubmission.Kind.LESSON,
            prompt="How clear was the explanation?",
            response_type=FeedbackQuestion.ResponseType.RATING,
            dimension_key="teaching",
            is_required=True,
        )
        answer = FeedbackAnswer(
            submission=submission,
            question=question,
            rating_value=5,
        )

        answer.full_clean()
        answer.save()

        self.assertEqual(answer.rating_value, 5)
