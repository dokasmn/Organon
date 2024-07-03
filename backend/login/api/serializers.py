from rest_framework import serializers
from rest_framework.authtoken.models import Token

from ..models import *

from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from djoser.serializers import TokenSerializer
from django.contrib.auth import authenticate
from djoser.serializers import UserCreatePasswordRetypeSerializer as BaseUserCreatePasswordRetypeSerializer


class CustomLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError('Invalid credentials')
            if not user.is_active:
                raise serializers.ValidationError('User is inactive')
            data['user'] = user
        else:
            raise serializers.ValidationError('Must include "email" and "password".')
        return data

    def create(self, validated_data):
        user = validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        is_professor = Professor_user.objects.filter(professor_auth_user=user).exists()
        is_school_user = SchoolUser.objects.filter(school_auth_user=user).exists()
        response =  {'token': token.key, 'is_professor': is_professor, 'is_school_user':is_school_user, 'email': user.email}
        print(response)
        return response
    

class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password']

        extra_kwargs = {
            'password': {'write_only': True}
        }
        

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()
        
        return user
        

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username')
        

class ConfirmationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    confirmation_code = serializers.CharField(max_length=6)
    
    
class UserCreatePasswordRetypeSerializer(BaseUserCreatePasswordRetypeSerializer):
    class Meta(BaseUserCreatePasswordRetypeSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 're_password')
        
        
class ProfessorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor_user
        fields = ['professor_auth_user']
    
    def create(self, validated_data):
        
        academic_education=None
        professional_history=None
        
        if validated_data['fk_professional_history']:
            professional_history = Professional_History.objects.get(id=validated_data['fk_professional_history'])
            
        if validated_data['fk_academic_education']:
            academic_education = Academic_Education.objects.get(id=validated_data['fk_academic_education'])
        
        professor = Professor_user.objects.create(
            professor_auth_user=validated_data['professor_auth_user'],
            fk_academic_education=academic_education,
            fk_professional_history=professional_history,
        )
        
        return professor

