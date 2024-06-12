from ..models import *
from .serializers import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action

class ProfessorUserViewSet(viewsets.ModelViewSet):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorUserSerializer
    permission_classes = [IsAuthenticated]
    
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def view_notes_by_user(self, request):
        notes = self.queryset.filter(note_user=request.user)
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)