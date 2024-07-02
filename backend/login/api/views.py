# projeto
from ..models import CustomUser, Professor_user
from .serializers import *
from ..permissions import IsSchoolAdmin, IsProfessorOwner

# django
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.utils import timezone

# rest_framework
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


class CustomLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            serializer = CustomLoginSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True) # método validate é chamado
            data = serializer.save() # método create é chamado
            print(data)
            return Response(data)
        except:
            return Response({"detail":"não foi possível concluir a solicitação"}, status=status.HTTP_401_UNAUTHORIZED)


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                user.generate_confirmation_code()

                send_mail(
                    'Código de confirmação',
                    f'Seu código de confirmação é: {user.confirmation_code}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                return Response({"detail": "Usuário registrado com sucesso"}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ConfirmEmailView(generics.GenericAPIView):
    serializer_class = ConfirmationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            email = serializer.validated_data['email']
            confirmation_code = serializer.validated_data['confirmation_code']
            try:
                user = CustomUser.objects.get(email=email, confirmation_code=confirmation_code)
                if user.confirmation_code_created_at + timedelta(minutes=6) < timezone.now():
                    user.generate_confirmation_code()
                    send_mail(
                        'Novo Código de Confirmação',
                        f'Seu novo código de confirmação é: {user.confirmation_code}',
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                    return Response({'detail': 'Código expirado. Um novo código foi enviado para seu e-mail.'}, status=status.HTTP_400_BAD_REQUEST)
                user.is_active = True
                user.confirmation_code = ''
                user.save()
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'user_id': user.id, 'email': user.email}, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({'detail': 'Código inválido ou e-mail não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"detail":"não foi possível concluir a solicitação"}, status=status.HTTP_500_BAD_REQUEST)


class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
            token = Token.objects.get(key=response.data['token'])
            return Response({'token': token.key, 'user_id': token.user_id, 'email': token.user.email})
        except:
            return Response({"detail":"não foi possível concluir a solicitação"}, status=status.HTTP_400_BAD_REQUEST)
            
            
class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorCreateSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsSchoolAdmin]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save()
    
    def create(self, request, *args, **kwargs):
        if not self.get_permissions()[0].has_permission(request, self):
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        if not self.get_permissions()[0].has_permission(request, self):
            return Response({"error": "Permission denied"}, status=status.HTTP_403_FORBIDDEN)
        return super().destroy(request, *args, **kwargs)
    
            