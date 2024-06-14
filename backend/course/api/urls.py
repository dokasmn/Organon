from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter
from course.api.utils import *

router = DefaultRouter()
router.register(r'subject', SubjectViewSet)
router.register(r'content', ContentViewSet)

app_name="course_app"
urlpatterns = [
    path('', include(router.urls)),
]