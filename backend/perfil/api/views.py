# projeto/views.py

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Note
from .serializers import NoteSerializer
from course.models import Content
from django.shortcuts import get_object_or_404

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['note_content__content_subject']


    def perform_create(self, serializer):
        return serializer.save(note_user=self.request.user)


    def create(self, request, *args, **kwargs):
        try:
            content_name = request.data.get('note_content', None)
            if not content_name:
                return Response({"detail": "O conteúdo da anotação não foi fornecido."}, status=status.HTTP_400_BAD_REQUEST)

            obj_content = get_object_or_404(Content, content_name=content_name, fk_school=request.user.fk_school.id)

            data = {
                "note_title": request.data.get('note_title', ''),
                "note_text": request.data.get('note_text', ''),
                "note_content": obj_content.id,
            }

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            note = self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(self.get_serializer(note).data, status=status.HTTP_201_CREATED, headers=headers)

        except Content.DoesNotExist:
            return Response({"detail": "O conteúdo especificado não foi encontrado."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


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
