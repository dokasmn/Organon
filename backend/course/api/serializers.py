from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):

    class Meta():
        model=Subject
        fields='__all__'
        
class ContentSerializer(serializers.ModelSerializer):
    content_subject = serializers.SlugRelatedField(slug_field='subject_name', queryset=Subject.objects.all())
    content_professor_user = serializers.SerializerMethodField()
    
    class Meta():
        model=Content
        fields=('content_name', 'content_description', 'content_subject', 'content_pdf', 'content_video', 'content_professor_user', 'content_position')
    

    def get_content_professor_user(self, obj):
        return obj.content_professor_user.professor_auth_user.username if obj.content_professor_user else None
    
    
    
class CommentSerializer(serializers.ModelSerializer):
    class Meta():
        model=Comment
        fields=('comment_text','fk_content')
    