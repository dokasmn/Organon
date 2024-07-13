from rest_framework import serializers
from ..models import *
from course.models import Subject
from django.shortcuts import get_object_or_404
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta():
        model=Note
        fields=['note_title','note_text','note_content']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        if self.context['request'].method in ['PUT', 'DELETE']:
            self.fields.pop('note_content')
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        note_content_id = serializers.PrimaryKeyRelatedField(
            source='note_content', queryset=Content.objects.all(), write_only=True
        )

        if 'request' in self.context and self.context['request'].method == 'GET':
            representation['id'] = instance.id

        if instance.note_content and instance.note_content.content_subject_id:
            subject = Subject.objects.filter(id=instance.note_content.content_subject_id).first()
            representation['note_content'] = {
                
                "note_content": instance.note_content.content_name,
                "subject_id":subject.id,
                "subject": subject.subject_name if subject else None
            }
        return representation
        
        
 