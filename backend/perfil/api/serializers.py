from rest_framework import serializers
from ..models import *
from course.models import Subject
from django.shortcuts import get_object_or_404
        
class NoteSerializer(serializers.ModelSerializer):

    class Meta():
        model=Note
        fields=['note_title','note_text','note_content']
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.note_content and instance.note_content.content_subject_id:
            subject = Subject.objects.filter(id=instance.note_content.content_subject_id).first()
            representation['note_content'] = {
                "note_content": instance.note_content.content_name,
                "subject": subject.subject_name if subject else None
            }
        return representation
        
        
 