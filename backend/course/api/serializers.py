from rest_framework import serializers
from ..models import *

class SubjectSerializer(serializers.ModelSerializer):
    class Meta():
        model=Subject
        fields='__all__'
        
class ContentSerializer(serializers.ModelSerializer):
    print("ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ")
    class Meta():
        try:
            model=Content
            fields=('content_name', 'content_description', 'content_subject', 'content_pdf', 'content_video')
        except Exception as e:
            print(f"ERRO NO META: {e}")

    def validate(self, attrs):
        # Exemplo de validação básica
        print("----------------------------------")
        print(attrs)

        if not 'content_video':
            print("BBBBBBBBBBBBBBBBBBBBBB")

        if 'content_name' not in attrs:
            raise serializers.ValidationError("O campo 'content_name' é obrigatório.")

        # Outras validações podem ser adicionadas conforme necessário

        return attrs

    