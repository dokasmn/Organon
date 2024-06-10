from app.models import User
from rest_framework import serializers

class User_serializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','age','msg','created_date']