from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from course.api.utils import SubjectViewSet

router = DefaultRouter()
router.register(r'subject', SubjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]