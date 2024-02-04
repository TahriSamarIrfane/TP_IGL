from django.apps import AppConfig


class TpIglAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'TP_IGL_app'
    def ready(self) -> None:
        import TP_IGL_app.signals