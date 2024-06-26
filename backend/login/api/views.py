# projeto
from ..models import CustomUser
from .serializers import UserCreateSerializer, ConfirmationSerializer, CustomLoginSerializer

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
        serializer = CustomLoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data)
    


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        print("kjdsgkjshdkjghjkdlfkjghlksjdfhlgjhsdlfkjglskjdfhlg")
        user = serializer.save()
        print(user)
        user.generate_confirmation_code()
        send_mail(
            'Código de confirmação',
            f'Seu código de confirmação é: {user.confirmation_code}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )


class ConfirmEmailView(generics.GenericAPIView):
    serializer_class = ConfirmationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        confirmation_code = serializer.validated_data['confirmation_code']
        try:
            user = CustomUser.objects.get(email=email, confirmation_code=confirmation_code)
            print(user)
            if user.confirmation_code_created_at + timedelta(minutes=6) < timezone.now():
                print("entrou nos 6 minutos")
                user.generate_confirmation_code()
                user.save()
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
            print("user.save()")
            token, created = Token.objects.get_or_create(user=user)
            print("token criado")
            return Response({'token': token.key, 'user_id': user.id, 'email': user.email}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Código inválido ou e-mail não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)


class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'user_id': token.user_id, 'email': token.user.email})