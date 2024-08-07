from ..models import *
from login.permissions import IsProfessorByContent
from ..permissions import IsSuperUser
from .serializers import *
from login.models import Professor_user
from cloudinary.uploader import upload
from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, NotAuthenticated
from rest_framework.decorators import action


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsSuperUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(SubjectViewSet, self).get_permissions()
    
    
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    
    def get_id_by_name(self, request):
        instance = self.get_object()
        data = request.data.copy()
        if data['name_subject'] == instance.subject_name:
            serializer = self.get_serializer(instance, data=data, partial=False)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data)


class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = [
        'content_professor_user', 
        'content_professor_user__professor_auth_user__username',
        'content_professor_user__professor_auth_user__email', 
        'content_subject__subject_name', 
        'content_name'
    ]

    def get_permissions(self):
        if self.action in ['create', 'update', 'delete', 'finished']:
            self.permission_classes = [IsProfessorByContent]
        else:
            self.permission_classes = [IsAuthenticated]
        return super(ContentViewSet, self).get_permissions()

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Content.objects.all()
        else:
            return Content.objects.filter(fk_school=user.fk_school)

    def perform_create(self, serializer):
        try:
            pdf_file = self.request.FILES.get('content_pdf')
            video_file = self.request.FILES.get('content_video')

            try:
                pdf_url = upload(pdf_file, folder="content_organon/pdfs")
            except Exception as e:
                raise serializers.ValidationError("PDF inválido")

            try:
                video_url = upload(video_file, resource_type='video', folder="content_organon/videos")
            except Exception as e:
                raise serializers.ValidationError("Envie um vídeo válido")

            try:
                content_subject = get_object_or_404(Subject, subject_name=self.request.data['content_subject'])
            except Subject.DoesNotExist:
                raise serializers.ValidationError("Matéria inválida")

            user = self.request.user
            professor = get_object_or_404(Professor_user, professor_auth_user=user)
            content = serializer.save(
                content_professor_user=professor,
                content_pdf=pdf_url['url'],
                content_video=video_url['url'],
                content_subject=content_subject,
                content_description=self.request.data['content_description'],
                content_name=self.request.data['content_name'],
                content_position=int(self.request.data['content_position']),
                fk_school=user.fk_school
            )
            return content
        except Exception as e:
            raise serializers.ValidationError("Houve algo errado com a requisição")

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            content = self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(self.get_serializer(content).data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if instance.content_professor_user.professor_auth_user != request.user:
                raise PermissionDenied("Você não tem permissão para alterar este conteúdo.")
            data = request.data.copy()
            data['content_professor_user'] = instance.content_professor_user.id
            serializer = self.get_serializer(instance, data=data, partial=False)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response({"success": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.content_professor_user.professor_auth_user != request.user:
            raise PermissionDenied("Você não tem permissão para deletar este conteúdo.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['post'])
    def finished(self, request, pk=None):
        content = self.get_object()
        try:
            finished = request.data.get('finished', False) 
            content.content_finished = finished
            content.save()
            if finished:
                return Response({"success": "Conteúdo marcado como terminado"}, status=status.HTTP_200_OK)
            else:
                return Response({"success": "Conteúdo marcado como não terminado"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Comment.objects.all()
        else:
            return Comment.objects.filter(fk_user_id=user.id)

    permission_classes = [IsAuthenticated]  

    def create(self, request, *args, **kwargs):
        try:
            data = {"comment_text":request.data['comment_text'],"fk_content":request.data['fk_content'],"fk_user":request.user.id}
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)

            comment = self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(self.get_serializer(comment).data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data

        for item in data:
            user_id = item['fk_user']
            user = get_object_or_404(CustomUser, id=user_id)
            item['fk_user'] = user.username
        
        return Response(data)
        
    
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if instance.fk_user != request.user:
                raise PermissionDenied("Você não tem permissão para alterar este conteúdo.")
            data = request.data.copy()
            data['fk_user'] = request.user
            serializer = self.get_serializer(instance, data=data, partial=False)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response({"success": serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            Response({"detail":str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            if instance.fk_user != request.user:
                raise PermissionDenied("Você não tem permissão para alterar este conteúdo.")
            self.perform_destroy(instance)
            return Response({"success":"dados deletados com sucesso"},status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            Response({"detail":str(e)}, status=status.HTTP_400_BAD_REQUEST)
        