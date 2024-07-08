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
        try:
            model=Content
            fields=('content_name', 'content_description', 'content_subject', 'content_pdf', 'content_video', 'content_professor_user')
        except Exception as e:
            ...

    def get_content_professor_user(self, obj):
        return obj.content_professor_user.professor_auth_user.username if obj.content_professor_user else None
    