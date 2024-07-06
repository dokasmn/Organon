from ..models import Content, Subject
from login.permissions import IsProfessorOwner
from ..permissions import IsSuperUser
from .serializers import *
from login.models import Professor_user
from cloudinary.uploader import upload

from rest_framework import status, viewsets
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

  
    def perform_create(self, serializer):
        print(self.request)
        try:
            pdf_file = self.request.FILES.get('content_pdf')
            video_file = self.request.FILES.get('content_video')
            try:
                pdf_url = upload(pdf_file)
            except Exception as e:
                print("ERRO NO PDF")
                raise e

            try:
                video_url = upload(video_file, resource_type='video')
            except Exception as e:
                print("ERRO NO VIDEO")
                raise e

            try:
                content = serializer.save(
                    content_professor_user=Professor_user.objects.get(professor_auth_user=self.request.user),
                    content_pdf=pdf_url['url'],
                    content_video=video_url['url'],
                    content_subject=Subject.objects.get(id=1),
                    content_description=self.request.data['content_description'],
                    content_name=self.request.data['content_name']
                )
            except Exception as e:
                raise e
            
            return content
        except Exception as e:
            print(f"ERROR: {e}")
            raise e

   
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
        return Response(serializer.data)

    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.content_professor_user != request.user:
            raise PermissionDenied("Você não tem permissão para deletar este conteúdo.")
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
