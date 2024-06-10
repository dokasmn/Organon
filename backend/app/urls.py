from django.urls import path
from .views import * 

urlpatterns = [
    path('', get_user_list, name='get_users'),
    path('change_and_delete', user_detail_change_and_delete, name='change_and_delete')
]
