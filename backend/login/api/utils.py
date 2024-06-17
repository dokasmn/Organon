from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

from ..models import Professor_user
from .serializers import ProfessorUserSerializer

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
