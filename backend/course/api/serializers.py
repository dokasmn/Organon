from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta():
        model=Subject
        fields='__all__'
        
class ContentSerializer(serializers.ModelSerializer):
    class Meta():
        model=Content
        fields='__all__'