# projeto
from ..models import *
from .serializers import *
from ..permissions import IsSchoolAdmin, IsProfessorOwner

# django
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.shortcuts import get_object_or_404

# rest_framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action


def generate_random_string(tamanho):
        caracteres = string.ascii_letters + string.digits + string.punctuation
        return ''.join(random.choice(caracteres) for _ in range(tamanho))

            
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
            user = CustomUser.objects.get(email=data['email'])
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
            atribute = {
                'username': data['username'],
                'email': data['email'],
                'password': data['password'],
                'fk_school': school.id
            }
            serializer = UserCreateSerializer(data=atribute)
            if serializer.is_valid():
                try:
                    user = serializer.save()
                    confirmation_code = ConfirmationCode(user=user, purpose='password_reset')
                    confirmation_code.generate_code()
                    send_mail(
                        'Código de confirmação',
                        'Código de confirmação',
                        f'Seu código de confirmação é: {confirmation_code.code}',
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                    return Response({"success": "Usuário registrado com sucesso"}, status=status.HTTP_201_CREATED)
                except Exception as e:
                    return Response({"detail": "O email de verificação não foi enviado"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            return Response({"detail": "Verifique se os campos estão preenchidos corretamente"}, status=status.HTTP_400_BAD_REQUEST)

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
                return Response({'detail': 'Código expirado. Tente novamente'}, status=status.HTTP_400_BAD_REQUEST)
            user.is_active = True
            code_obj.code = ''
            user.save()
            code_obj.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({"success": {'token': token.key, 'user_id': user.id, 'email': user.email}}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Código inválido ou e-mail não encontrado.'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def resend_code(self, request):
        serializer = ReConfirmationCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = CustomUser.objects.get(email=request.data["email"])
        confirmation_code = ConfirmationCode(user_id=user.id)
        confirmation_code.generate_code()
        confirmation_code.save()
        send_mail(
            'Novo Código de Confirmação',
            f'Seu novo código de confirmação é: {confirmation_code.code}',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        return Response({'success': 'Um novo código foi enviado para seu e-mail.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def invite_update_password_auth(self, request):
        try:
            user = CustomUser.objects.get(id=request.data['user_id'])
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

    @action(detail=False, methods=['patch'])
    def set_password(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = CustomUser.objects.get(id=serializer.validated_data['user_id'])
                code = serializer.validated_data['code']
                confirmation_code = ConfirmationCode.objects.get(user=user, code=code, purpose='password_reset')
                if confirmation_code.created_at + timezone.timedelta(minutes=10) > timezone.now():
                    user.set_password(serializer.validated_data['password'])
                    confirmation_code.delete()
                    user.save()
                    return Response({'success': 'Senha alterada'}, status=status.HTTP_200_OK)
                else:
                    return Response({'detail': 'Código de confirmação expirado.'}, status=status.HTTP_400_BAD_REQUEST)
            except ConfirmationCode.DoesNotExist:
                return Response({'detail': 'Código de confirmação inválido.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response({"success": "Usuário deslogado com sucesso"}, status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return Response({"detail": "Usuário não está logado"}, status=status.HTTP_400_BAD_REQUEST)


    


    @action(detail=False, methods=['post'])
    def close_account(self, request):
        print(request.user.username)
        token = Token.objects.get(user=request.user)
        token.delete()

        request.user.is_valid = False;
        request.user.password = generate_random_string(12);


        request.user.save()
        print(request.user.is_valid)
        return Response(serializer.data)    

        
class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor_user.objects.all()
    serializer_class = ProfessorCreateSerializer
    permission_classes = [IsAuthenticated, IsProfessorOwner, IsSchoolAdmin]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsAuthenticated]
        elif self.action in ['update', 'partial_update']:
            permission_classes = [IsProfessorOwner]
        else:
            permission_classes = [IsSchoolAdmin]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        if not self.get_permissions()[0].has_permission(request, self):
            return Response({"detail": "Permissão negada"}, status=status.HTTP_403_FORBIDDEN)
        
        user_data = request.data.pop('user')
        professor_data = request.data
        
        try:
            school = School.objects.get(school_state=user_data['state'], school_name=user_data['school'])
        except School.DoesNotExist:
            return Response({"detail": "Não foi encontrada nenhuma escola com essas características"}, status=status.HTTP_400_BAD_REQUEST)
        
        user_data['fk_school'] = school.id
        user_serializer = UserCreateSerializer(data=user_data)
        
        if user_serializer.is_valid():
            user = user_serializer.save()
            professor_data['professor_auth_user'] = user.id
            
            professor_serializer = ProfessorCreateSerializer(data=professor_data)
            if professor_serializer.is_valid():
                professor = professor_serializer.save()
                
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
                
                return Response({
                    "professor": ProfessorCreateSerializer(professor).data,
                    "detail": "Professor criado com sucesso. Por favor, verifique seu e-mail para confirmar a conta."
                }, status=status.HTTP_201_CREATED)
            else:
                user.delete()
                return Response(professor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfessionViewSet(viewsets.ModelViewSet):
    queryset = Profession.objects.all()
    serializer_class = ProfessionSerializer

class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [AllowAny]