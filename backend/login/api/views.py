from ..models import *
from .serializers import *
from ..api.utils import *

from login.models import Professor_user

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# classe de autenticação
class ProfessorTokenObtainPairView(TokenObtainPairView):
    serializer_class = ProfessorTokenObtainPairSerializer
    
class ProfessorUserAPIView(APIView):
    permission_classes = [IsAuthenticated]