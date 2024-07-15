from rest_framework import serializers, viewsets
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

        response =  {
            'user_id': user.id,
            'token': token.key, 
            'is_professor': is_professor, 
            'is_school_user':is_school_user, 
            'email': user.email, 
            "username":user.username,
            "id":user.id
        }
        
        return response    


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'fk_school']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            fk_school=validated_data['fk_school']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
        

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username')
        read_only_fields = ['id']


class ConfirmationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    confirmation_code = serializers.CharField(max_length=6)


class ReConfirmationCodeSerializer(serializers.Serializer):
    class Meta:
        model = CustomUser
        fields = ('email')
    
    
class UserCreatePasswordRetypeSerializer(BaseUserCreatePasswordRetypeSerializer):
    class Meta(BaseUserCreatePasswordRetypeSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 're_password')


class AcademicEducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic_Education
        fields = ['degree', 'training_name']


class ProfessionalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Professional_History
        fields = ['company', 'fk_profession']

        
class ProfessorCreateSerializer(serializers.ModelSerializer):
    fk_academic_education = AcademicEducationSerializer(required=False)
    fk_professional_history = ProfessionalHistorySerializer(required=False)
    
    class Meta:
        model = Professor_user
        fields = ['professor_auth_user', 'fk_academic_education', 'fk_professional_history']
    
    def create(self, validated_data):
        academic_education_data = validated_data.pop('fk_academic_education', None)
        professional_history_data = validated_data.pop('fk_professional_history', None)
        
        if academic_education_data:
            academic_education = Academic_Education.objects.create(**academic_education_data)
        else:
            academic_education = None
            
        if professional_history_data:
            professional_history = Professional_History.objects.create(**professional_history_data)
        else:
            professional_history = None
        
        professor = Professor_user.objects.create(
            fk_academic_education=academic_education,
            fk_professional_history=professional_history,
            **validated_data
        )
        
        return professor


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ['id', 'profession_name']


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'school_name', 'school_state']