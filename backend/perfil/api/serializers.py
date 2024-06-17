from rest_framework import serializers
from ..models import *
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta():
        model=Note
        fields=['note_title','note_text','note_content','note_user','note_date']
 