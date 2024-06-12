from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta():
        model=Subject
        filds=['subject_name']