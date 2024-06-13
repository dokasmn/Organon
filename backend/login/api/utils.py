from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Professor_user
from .serializers import ProfessorUserSerializer

class ProfessorUserViewSet(viewsets.ModelViewSet):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorUserSerializer
    permission_classes = [IsAuthenticated]
