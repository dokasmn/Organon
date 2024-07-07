from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):

    class Meta():
        model=Subject
        fields='__all__'
        
class ContentSerializer(serializers.ModelSerializer):
    content_subject = serializers.SlugRelatedField(slug_field='subject_name', queryset=Subject.objects.all())
    
    class Meta():
        try:
            model=Content
            fields=('content_name', 'content_description', 'content_subject', 'content_pdf', 'content_video')
        except Exception as e:
            ...

    