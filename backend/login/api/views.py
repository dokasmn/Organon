# projeto
from ..models import CustomUser
from .serializers import UserCreateSerializer, ConfirmationSerializer, CustomLoginSerializer

# django
from django.core.mail import send_mail
from django.conf import settings

# rest framework
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
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.generate_confirmation_code()
        send_mail(
            'Confirmation Code',
            f'Your confirmation code is: {user.confirmation_code}',
            'from@example.com',
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
            user.is_active = True
            user.confirmation_code = ''
            user.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'user_id': user.id, 'email': user.email}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'Invalid code or email.'}, status=status.HTTP_400_BAD_REQUEST)

class CustomObtainAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'user_id': token.user_id, 'email': token.user.email})

# classe de autenticação
# class ProfessorTokenObtainPairView(TokenObtainPairView):
#     serializer_class = ProfessorTokenObtainPairSerializer

# class ProfessorUserAPIView(APIView):
#     permission_classes = [IsAuthenticated]

# class UserTokenObtainPairView(TokenObtainPairView):
#     serializer_class = UserTokenObtainPairSerializer
#     email = serializers.EmailField()

# class UserTokenObtainAPIView(APIView):
#     permission_classes = [AllowAny]
#     def post(self, request):
#         email = request.data.get('email')
#         print(email)
#         password = request.data.get('password')
#         print(password)
#         if not email or not password:
#             return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
#         tokens = auth_user(email, password)
#         if tokens is None:
#             return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#         return Response(tokens, status=status.HTTP_200_OK)


# @api_view(['GET'])
# def get_user_data(request):
#     print(request.headers)
#     user_data={}
#     auth_header = request.headers.get('Authorization', None)
#     if auth_header and auth_header.startswith('Bearer '):
#         token = auth_header.split(' ')[1]
#     else:
#         token = None
#     if token:
#         try:
#             decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
#             user_id = decoded_token.get('user_id')
#             if user_id:
#                 User = get_user_model()
#                 user = User.objects.get(id=user_id)
#             else:
#                 user = None
#         except (InvalidTokenError, User.DoesNotExist):
#             user = None
#     else:
#         user = None
#     if user:
#         user_data['username'] = user.username
#         user_data['email'] = user.email
#         return Response(user_data, status=200)
#     else:
#         return Response({'detail': 'Invalid token or user not found'}, status=401)


