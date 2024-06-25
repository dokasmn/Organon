from django.urls import path, include
from .views import UserRegistrationView, ConfirmEmailView, CustomLoginView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('confirm-email/', ConfirmEmailView.as_view(), name='confirm-email'),
    path('auth/login/', CustomLoginView.as_view(), name='login'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]


