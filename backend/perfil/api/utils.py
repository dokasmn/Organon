from ..models import *
from .serializers import *

from rest_framework import viewsets
from rest_framework.permissions import AllowAny
    
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]