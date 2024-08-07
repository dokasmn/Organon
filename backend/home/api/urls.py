from django.urls import path, include
from rest_framework.routers import DefaultRouter
from course.api.views import *

router = DefaultRouter()
router.register(r'subject', SubjectViewSet)
router.register(r'content', ContentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
