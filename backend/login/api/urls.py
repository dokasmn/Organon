from django.urls import path, include
from .utils import ProfessorUserViewSet

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r"professor", ProfessorUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
