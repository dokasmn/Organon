# projeto
from ..models import *
from .serializers import *
from ..permissions import IsSchoolAdmin, IsProfessorOwner

# django
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

            
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ['register', 'login', 'confirm_email', 'resend_code']:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return [permission() for permission in self.permission_classes]

    @action(detail=False, methods=['post'])
    def register(self, request):
        data = request.data

        school = School.objects.get(school_state=data['state'], school_name=data['school'])

        if not school:
            return Response({"detail": "não foi encontrada nenhuma escola com essas características"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            search_user = CustomUser.objects.get(
                username=data['username'],
                email=data['email'],
                fk_school=school.id,
                password=data['password']
            )

            confirmation_code = ConfirmationCode(user=user, purpose='password_reset')
            confirmation_code.generate_code()
            send_mail(
                'Código de confirmação',
                f'Seu código de confirmação é: {confirmation_code.code}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return Response({"success": "Usuário registrado com sucesso"}, status=status.HTTP_201_CREATED)
        except:
            atribute = {
                'username':data['username'],
                'email':data['email'],
                'password':data['password'],
                'fk_school':school.id
            }
            serializer = UserCreateSerializer(data=atribute)
            if serializer.is_valid():
                try:
                    user = serializer.save()
                    confirmation_code = ConfirmationCode(user=user, purpose='password_reset')
                    confirmation_code.generate_code()
                    send_mail(
                        'Código de confirmação',
                        f'Seu código de confirmação é: {confirmation_code.code}',
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                    return Response({"success": "Usuário registrado com sucesso"}, status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
<<<<<<< HEAD
        else:
            confirmation_code = ConfirmationCode(user=user, purpose='2af')
            confirmation_code.generate_code()
            send_mail(
                'Código de confirmação',
                f'Seu código de confirmação é: {confirmation_code.code}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
=======
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
>>>>>>> 01701cc85a3b6f7a7120831047dbeeb157bed007

    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer = CustomLoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        data = serializer.save()
        return Response(data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def confirm_email(self, request):
        serializer = ConfirmationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        confirmation_code = serializer.validated_data['confirmation_code']
        try:
            code_obj = ConfirmationCode.objects.get(code=confirmation_code)
            user = CustomUser.objects.get(email=email, pk=code_obj.user.id)
            if code_obj.created_at + timezone.timedelta(minutes=6) < timezone.now():
                return Response({'detail':'Código expirado. Tente novamente'}, status=status.HTTP_400_BAD_REQUEST)
            user.is_active = True
            code_obj.code = ''
            user.save()
            code_obj.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({"success":{'token': token.key, 'user_id': user.id, 'email': user.email}}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Código inválido ou e-mail não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def resend_code(self, request):
        user = request.user
        code = ConfirmationCode(user_id=user)
        code.generate_confirmation_code()
        code.save()
        send_mail(
            'Novo Código de Confirmação',
            f'Seu novo código de confirmação é: {user.confirmation_code}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        return Response({'success': 'Um novo código foi enviado para seu e-mail.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post','put'])
    def invite_update_password_auth(self, request, pk=None):
        user = self.get_object()
        try:
            confirmation_code = ConfirmationCode(user=user, purpose='password_reset')
            confirmation_code.generate_code()
            send_mail(
                'Confirmação de senha',
                f'Seu código de confirmação é: {confirmation_code.code}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return Response({"success": "Um código de confirmação foi enviado para o seu e-mail"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post','put'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        code = request.data.get('code')
        try:
            confirmation_code = ConfirmationCode.objects.get(user=user, code=code, purpose='password_reset')
            if confirmation_code.created_at + timezone.timedelta(minutes=10) > timezone.now():
                serializer = UserSerializer(data=request.data)
                if serializer.is_valid():
                    user.set_password(serializer.validated_data['password'])
                    confirmation_code.delete() 
                    user.save()
                    return Response({'success': 'senha alterada'}, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({'detail': 'Código de confirmação expirado.'}, status=status.HTTP_400_BAD_REQUEST)
        except ConfirmationCode.DoesNotExist:
            return Response({'detail': 'Código de confirmação inválido.'}, status=status.HTTP_400_BAD_REQUEST)
        
    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"success": "Usuário deslogado com sucesso"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"error": "Usuário não está logado"}, status=status.HTTP_400_BAD_REQUEST)

        
        
        
class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorCreateSerializer
    permission_classes = [IsAuthenticated, IsProfessorOwner, IsSchoolAdmin]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial update']:
            permission_classes = [IsProfessorOwner]
        else:
            permission_classes = [IsSchoolAdmin]
        return [permission() for permission in permission_classes]
    
    def perform_create(self, serializer):
        serializer.save()
    
    def create(self, request, *args, **kwargs):
        if not self.get_permissions()[0].has_permission(request, self):
            return Response({"detail": "Permissão negada"}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        try:
            school = School.objects.get(school_state=data['state'], school_name=data['school'])
        except School.DoesNotExist:
            return Response({"detail": "Não foi encontrada nenhuma escola com essas características"}, status=status.HTTP_400_BAD_REQUEST)
        
        atribute = {
            'fk_academic_education_id': data['fk_academic_education_id'],
            'fk_professional_history': data['fk_professional_history'],
            'password': data['password'],
            'fk_school': school.id
        }
        
        serializer = ProfessorCreateSerializer(data=atribute)
        if serializer.is_valid():
            try:
                professor = serializer.save()
                user = CustomUser.objects.get(id=professor.professor_auth_user_id)
                token, created = Token.objects.get_or_create(user=user)
                confirmation_code = ConfirmationCode(user=user, purpose='2af')
                confirmation_code.generate_code()
                frontend_url = f"http://localhost:5173/home?confirm_code={confirmation_code.code}&token={token.key}"
                send_mail(
                    'Código de confirmação',
                    f'Clique no link para confirmar seu e-mail e acessar a aplicação: {frontend_url}',
                    settings.DEFAULT_FROM_EMAIL,
                    [user.email],
                    fail_silently=False,
                )
                return Response({"success": "Usuário registrado com sucesso"}, status=status.HTTP_201_CREATED)
            except Exception as e:
                print(e)
                return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)