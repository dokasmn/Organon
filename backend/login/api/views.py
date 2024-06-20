from ..models import *
from .serializers import *
from ..api.utils import *
from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view
from rest_framework import status
from .utils import auth_user 
from rest_framework.permissions import AllowAny

import jwt
from jwt.exceptions import InvalidTokenError

# classe de autenticação
class ProfessorTokenObtainPairView(TokenObtainPairView):
    serializer_class = ProfessorTokenObtainPairSerializer

class ProfessorUserAPIView(APIView):
    permission_classes = [IsAuthenticated]

class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer
    email = serializers.EmailField()

class UserTokenObtainAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        print(email)
        password = request.data.get('password')
        print(password)
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
        tokens = auth_user(email, password)
        if tokens is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(tokens, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_user_data(request):
    print(request.headers)
    user_data={}
    auth_header = request.headers.get('Authorization', None)
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        token = None
    if token:
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_token.get('user_id')
            if user_id:
                User = get_user_model()
                user = User.objects.get(id=user_id)
            else:
                user = None
        except (InvalidTokenError, User.DoesNotExist):
            user = None
    else:
        user = None
    if user:
        user_data['username'] = user.username
        user_data['email'] = user.email
        return Response(user_data, status=200)
    else:
        return Response({'detail': 'Invalid token or user not found'}, status=401)


