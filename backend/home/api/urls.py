from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import PostViewSet
from . import views

# post_router = DefaultRouter()
# post_router.register(r'posts', PostViewSet)

urlpatterns = [
    # path('', include(post_router.urls)),
    path('', views.list_datas),
]