from django.urls import path
from .views import UserTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from .views import UserTokenObtainAPIView

urlpatterns = [
    path('api/token/', UserTokenObtainAPIView.as_view(), name='token_obtain_api'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/get_user_data/', views.get_user_data, name="get_user_data")
]
