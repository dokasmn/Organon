from rest_framework import serializers
from ..models import *

class ProfessorUserSerializer(serializers.ModelSerializer):
    class Meta():
        model=Professor_user
        filds=['professor_cpf','professor_auth_user']
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta():
        model=Note
        filds=['note_title','note_text','note_content','note_user','note_date']
