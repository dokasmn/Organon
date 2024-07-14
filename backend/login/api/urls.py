from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, ProfessorViewSet 

router = DefaultRouter()
router.register(r'user', CustomUserViewSet, basename='user')
router.register(r'professor', ProfessorViewSet, basename='professor')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]


