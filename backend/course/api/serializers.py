from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta():
        model=Subject
        fields=['subject_name']
        
class ContentSerializer(serializers.ModelSerializer):
    class Meta():
        model=Content
        fields=['content_name','content_description','content_subject','content_professor_user','notes']