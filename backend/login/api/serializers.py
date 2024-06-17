from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from ..models import Professor_user

class ProfessorUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor_user
        fields = '__all__'

class ProfessorTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        try:
            professor_user = Professor_user.objects.get(professor_auth_user=user)
            token['name'] = user.username
            token['email'] = user.email
        except Professor_user.DoesNotExist:
            pass
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['name'] = self.user.username
        data['email'] = self.user.email
        try:
            professor_user = Professor_user.objects.get(professor_auth_user=self.user)
        except Professor_user.DoesNotExist:
            professor_user = None
        return data
