from ..models import *
from .serializers import *

from rest_framework import viewsets
from rest_framework.permissions import AllowAny

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny] 