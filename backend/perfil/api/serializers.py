from rest_framework import serializers
from ..models import *
        
class NoteSerializer(serializers.ModelSerializer):
    note_content = serializers.SerializerMethodField()

    class Meta():
        model=Note
        fields=['note_title','note_text','note_content']
        
    def get_note_content(self, obj):
        return {
                "note_content": obj.note_content.content_name, 
                "subject": obj.note_content.content_subject_id 
                } if obj.note_content and obj.note_content.content_subject_id else None
 