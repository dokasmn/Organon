# from django.urls import path, include
# from .views import UserRegistrationView, ConfirmEmailView, CustomLoginView, ResendCodeView

# urlpatterns = [
#     path('register/', UserRegistrationView.as_view(), name='register'),
#     path('confirm-email/', ConfirmEmailView.as_view(), name='confirm-email'),
#     path('resend_code', ResendCodeView.as_view(), name="resend-code"),
#     path('auth/login/', CustomLoginView.as_view(), name='login'),
#     path('auth/', include('djoser.urls')),
#     path('auth/', include('djoser.urls.authtoken')),
# ]


from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]


