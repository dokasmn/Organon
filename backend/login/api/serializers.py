from djoser.serializers import UserCreateSerializer as BaseUserSerializer
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

# from ..models import Professor_user

from ..models import CustomUser

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username', 'password')

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username')


# class ProfessorUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Professor_user
#         fields = '__all__'

# class ProfessorTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         try:
#             professor_user = Professor_user.objects.get(professor_auth_user=user)
#             token['name'] = user.username
#             token['email'] = user.email
#         except Professor_user.DoesNotExist:
#             pass
#         return token

#     def validate(self, attrs):
#         data = super().validate(attrs)
#         data['name'] = self.user.username
#         data['email'] = self.user.email
#         try:
#             professor_user = Professor_user.objects.get(professor_auth_user=self.user)
#         except Professor_user.DoesNotExist:
#             professor_user = None
#         return data

# class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
#     email = serializers.EmailField()
#     password = serializers.CharField(
#         max_length=128,
#         write_only=True,
#     )

#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)
#         token['email'] = user.email
#         return token

#     def validate(self, attrs):
#         email = attrs.get("email")
#         password = attrs.get("password")

#         if email and password:
#             try:
#                 user = User.objects.get(email=email)
#             except User.DoesNotExist:
#                 raise serializers.ValidationError("Invalid email or password")

#             if not user.check_password(password):
#                 raise serializers.ValidationError("Invalid email or password")

#             attrs['user'] = user
#         else:
#             raise serializers.ValidationError("Must include 'email' and 'password'.")

#         return super().validate(attrs)

#     def validate_email(self, value):
#         return value.lower()  # Convertendo o email para minúsculas

#     def validate_password(self, value):
#         return value