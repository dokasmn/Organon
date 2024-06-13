from ..models import *

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProfessorUserSerializer(serializers.ModelSerializer):
    class Meta():
        model=Professor_user
        filds=['professor_cpf','professor_auth_user']

class ProfessorTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.username
        token['email'] = user.email
        try:
            professor_user = Professor_user.objects.get(professor_auth_user=user)
            token['professor_cpf'] = professor_user.professor_cpf
        except Professor_user.DoesNotExist:
            token['professor_cpf'] = None
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['name'] = self.user.username
        data['email'] = self.user.email
        try:
            professor_user = Professor_user.objects.get(professor_auth_user=self.user)
            data['professor_cpf'] = professor_user.professor_cpf
        except Professor_user.DoesNotExist:
            data['professor_cpf'] = None
        return data