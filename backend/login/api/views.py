# projeto
from ..models import CustomUser, Professor_user
from .serializers import *

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


class CustomLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            serializer = CustomLoginSerializer(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            data = serializer.save()
            return Response(data)
        except:
            return Response({"erro":"não foi possível concluir a solicitação"})


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
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
        except:
            Response({"erro":"não foi possível concluir a solicitação"})


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
            Response({"erro":"não foi possível concluir a solicitação"})


class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
            token = Token.objects.get(key=response.data['token'])
            return Response({'token': token.key, 'user_id': token.user_id, 'email': token.user.email})
        except:
            Response({"erro":"não foi possível concluir a solicitação"})
            
            
class ProfessorRegistrationView(generics.CreateAPIView):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
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
        except:
            Response({"erro":"não foi possível concluir a solicitação"})
            