from ..models import Content, Subject
from login.permissions import IsProfessorOwner
from ..permissions import IsSuperUser
from .serializers import *
from login.models import Professor_user
from cloudinary.uploader import upload
from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied


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
    permission_classes = [IsAuthenticated, IsProfessorOwner]

    #Filtros de pesquisa
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['content_professor_user', 'content_subject__subject_name', 'content_name']
    # search_fields = ['campo1', 'campo3']
    # ordering_fields = ['campo1', 'campo4']

  
    def perform_create(self, serializer):
        try:
            pdf_file = self.request.FILES.get('content_pdf')
            video_file = self.request.FILES.get('content_video')
            
            try:
                pdf_url = upload(pdf_file, folder="content_organon/pdfs")
            except Exception as e:
                raise serializers.ValidationError("Imagem iválida")

            try:
                video_url = upload(video_file, resource_type='video', folder="content_organon/videos")
            except Exception as e:
                raise serializers.ValidationError("Envie um vídeo válido")

            try:
                content_subject = get_object_or_404(Subject, subject_name=self.request.data['content_subject'])
            except Subject.DoesNotExist:
                raise serializers.ValidationError("Vídeo inválido")
            
            try:
                content = serializer.save(
                    content_professor_user=get_object_or_404(Professor_user, professor_auth_user=self.request.user),
                    content_pdf=pdf_url['url'],
                    content_video=video_url['url'],
                    content_subject=content_subject,
                    content_description=self.request.data['content_description'],
                    content_name=self.request.data['content_name'],
                    content_position=int(self.request.data['content_position'])
                )
            except Exception as e:
                raise serializers.ValidationError("Dados inválidos")
            return content
        except Exception as e:
            print(e)
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
        instance = self.get_object()
        if instance.content_professor_user != request.user:
            raise PermissionDenied("Você não tem permissão para alterar este conteúdo.")
        data = request.data.copy()
        data['content_professor_user'] = instance.content_professor_user.id
        serializer = self.get_serializer(instance, data=data, partial=False)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"success":serializer.data},status=status.HTTP_200_OK)

    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.content_professor_user != request.user:
            raise PermissionDenied("Você não tem permissão para deletar este conteúdo.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
