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
    content_finished = serializers.SerializerMethodField()
    
    class Meta():
        model=Content
        fields=(
            'content_id',
            'content_name',
            'content_description',
            'content_date',
            'content_subject',
            'content_pdf',
            'content_video',
            'content_professor_user',
            'content_position',
            'content_finished'
        )
    

    def get_content_professor_user(self, obj):
        return obj.content_professor_user.professor_auth_user.username if obj.content_professor_user else None


    def get_content_id(self, obj):
        return obj.id if obj else None
    
    def get_content_finished(self, obj):
        return obj.content_finished if obj else None
    
    
    
class CommentSerializer(serializers.ModelSerializer):

    class Meta():
        model=Comment
        fields=('comment_text','fk_content', 'fk_user')    

    


    