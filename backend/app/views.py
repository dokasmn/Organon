# django
from django.shortcuts import render

# rest_framework
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import *

# project
from .models import User
from .serializers import User_serializers

@api_view(['GET', 'POST'])
def get_user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = User_serializers(users, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = User_serializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail_change_and_delete(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = User_serializers(user)
        return Response(serializer.data)
    
    if request.method == "PUT":
        serializer = User_serializers(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
