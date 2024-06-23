from django.urls import path, include
from .views import UserRegistrationView, ConfirmEmailView, CustomObtainAuthToken, CustomLoginView
from djoser.views import TokenCreateView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('confirm-email/', ConfirmEmailView.as_view(), name='confirm_email'),
    path('login/auth/token/login/', CustomLoginView.as_view(), name='token_obtain_pair'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]


