from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', include('login.api.urls'), name='login_api'),
    path('home/', include('home.api.urls'), name='home_api'),
    path('perfil/', include('perfil.api.urls'), name='perfil'),
    path('course/', include('course.api.urls'), name='course'),
    path('admin_portal/', include('admin_portal.api.urls'), name='admin_portal')
]
