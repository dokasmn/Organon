from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken

from ..models import Professor_user
from .serializers import ProfessorUserSerializer
from django.contrib.auth.models import User
from django.contrib.auth.backends import BaseBackend

class ProfessorUserViewSet(viewsets.ModelViewSet):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorUserSerializer
    permission_classes = [IsAuthenticated]

class IsProfessor(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            professor_user = Professor_user.objects.get(professor_auth_user=request.user)
            return True
        except Professor_user.DoesNotExist:
            return False
        
class loginBackend(BaseBackend):
    def authenticate(self, user_email=None, user_password=None):
        print("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
        try:
            user = User.objects.get(email=user_email)
            print(f"USER: {user}")
            print(f"PASSWORD DATABASE: {user.password}")
            print(f"User login: {user_password}")
            
            
            # if user.check_password(user_password):
            #     return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        

def auth_user(email, password):  
    user = loginBackend.authenticate(email, password)
    print(user)
    
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }
    else:
        print("Usuário não encontrado ou senha incorreta")
        return None

