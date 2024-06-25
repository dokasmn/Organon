from ..models import Content
from login.api.views import IsProfessorOwner
from .serializers import *

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.decorators import action

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    
    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    
    @action(detail=False, methods=['post'])
    def get_id_by_name(self, request):
        name_subject = request.data.get('name_subject')
        if not name_subject:
            return Response({'error': 'Nome da matéria é obrigatório'}, status=400)
        try:
            subject = Subject.objects.get(subject_name=name_subject)
        except Subject.DoesNotExist:
            raise NotFound('Matéria não encontrada')
        serializer = self.get_serializer(subject)
        return Response(serializer.data)


class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    permission_classes = [IsAuthenticated, IsProfessorOwner]


    def perform_create(self, serializer):
        serializer.save(content_professor_user=self.request.user)


    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.content_professor_user != request.user:
            raise PermissionDenied("Você não tem permissão para alterar este conteúdo.")
        data = request.data.copy()
        data['content_professor_user'] = instance.content_professor_user.id
        serializer = self.get_serializer(instance, data=data, partial=False)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.content_professor_user != request.user:
            raise PermissionDenied("Você não tem permissão para alterar este conteúdo.")
        data = request.data.copy()
        data['content_professor_user'] = instance.content_professor_user.id
        serializer = self.get_serializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.content_professor_user != request.user:
            raise PermissionDenied("Você não tem permissão para deletar este conteúdo.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
