from rest_framework import serializers
from ..models import *
from login.models import CustomUser

class SubjectSerializer(serializers.ModelSerializer):

    class Meta():
        model=Subject
        fields='__all__'
        
class ContentSerializer(serializers.ModelSerializer):
    content_subject = serializers.SlugRelatedField(slug_field='subject_name', queryset=Subject.objects.all())
    content_professor_user = serializers.SerializerMethodField()
    content_id = serializers.SerializerMethodField()
    
    class Meta():
        model=Content
        fields=('content_id', 'content_name', 'content_description', 'content_subject', 'content_pdf', 'content_video', 'content_professor_user', 'content_position')
    

    def get_content_professor_user(self, obj):
        return obj.content_professor_user.professor_auth_user.username if obj.content_professor_user else None


    def get_content_id(self, obj):
        return obj.id if obj else None
    
    
    
class CommentSerializer(serializers.ModelSerializer):
    fk_user = serializers.SerializerMethodField()

    class Meta():
        model=Comment
        fields=('comment_text','fk_user','fk_content')
    
    def get_fk_user(self, obj):
        return obj.fk_user.username if obj else None