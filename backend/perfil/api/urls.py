from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .utils import ProfessorUserViewSet, NoteViewSet

router = DefaultRouter()
router.register(r"professor", ProfessorUserViewSet)
router.register(r"notes", NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
