from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .utils import NoteViewSet

router = DefaultRouter()
router.register(r"notes", NoteViewSet)

app_name="perfil_app"
urlpatterns = [
    path('', include(router.urls)),
]
