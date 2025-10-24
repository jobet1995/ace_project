from django.apps import AppConfig


class HomeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"  # type: ignore
    name = "home"

    def ready(self):
        # Import signals to ensure snippet models are registered
        from . import signals  # noqa