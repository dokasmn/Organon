# projeto
from ..models import *
from .serializers import *

# rest framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
    
# Note classes
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]


    def perform_create(self, serializer):
        return serializer.save(note_user=self.request.user)
    
    
    def list(self, request, *args, **kwargs):
        queryset = Note.objects.filter(note_user=request.user)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.note_user != request.user:
            return Response({'detail': 'Not authorized to update this note.'}, status=status.HTTP_403_FORBIDDEN)
        
        data = request.data.copy()
        serializer = self.get_serializer(instance, data=data, partial=False)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
        
        
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.note_user != request.user:
            return Response({'detail': 'Not authorized to delete this note.'}, status=status.HTTP_403_FORBIDDEN)
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
