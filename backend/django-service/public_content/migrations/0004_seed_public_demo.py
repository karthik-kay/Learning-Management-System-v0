from django.apps import apps as django_apps
from django.contrib.contenttypes.management import create_contenttypes
from django.core.management import call_command
from django.db import migrations


def seed_public_demo(apps, schema_editor):
    database_alias = schema_editor.connection.alias

    # The review seed uses generic relations before Django's post_migrate
    # handlers run, so ensure its target content types already exist.
    for app_label in ("courses", "programs", "faculty"):
        create_contenttypes(
            django_apps.get_app_config(app_label),
            verbosity=0,
            interactive=False,
            using=database_alias,
        )

    call_command("seed_public_demo", verbosity=1)


class Migration(migrations.Migration):
    dependencies = [
        ("public_content", "0003_successstory"),
        ("reviews", "0002_feedbackanswer_feedbackquestion_feedbacksubmission_and_more"),
        ("faculty", "0002_alter_facultyprofile_options_and_more"),
        ("certifications", "0002_certificationoffering"),
        ("courses", "0017_remove_course_faculty_remove_course_instructor_image_and_more"),
        ("programs", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_public_demo, migrations.RunPython.noop),
    ]
