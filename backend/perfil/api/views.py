# projeto
from ..models import *
from .serializers import *
from login.models import School
from django.shortcuts import get_object_or_404

# rest framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
    

class CustomPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100 


# Note classes
class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]


    def list(self, serializer, *args, **kwargs):
        newQuerySet = Note.objects.filter(fk_user=request.user)

        return Response(newQuerySet)


    def perform_create(self, serializer):
        return serializer.save(note_user=self.request.user)
    

    def create(self, request, *args, **kwargs):
        try:
            try:
                print(request.data['note_content'])
                obj_content = Content.objects.get(content_name=request.data['note_content'], fk_school=request.user.fk_school.id)
            except Content.DoesNotExist:
                return Response({"detail": "O conteúdo especificado não foi encontrado."}, status=status.HTTP_404_NOT_FOUND)
                
            data = {
                "note_title": request.data['note_title'],
                "note_text": request.data['note_text'],
                "note_content": obj_content.id,
            }
            
            serializer = self.get_serializer(data=data)
                
            serializer.is_valid(raise_exception=True)

            note = self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(self.get_serializer(note).data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
    def list(self, request, *args, **kwargs):
        queryset = Note.objects.filter(note_user=request.user)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    
    def update(self, request, *args, **kwargs):
        print("AAAAAAAAAAAAAAAAAA")
        instance = self.get_object()
        print(f"Updating note: {instance.id}")
        print(f"Request data: {request.data}")

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
    
