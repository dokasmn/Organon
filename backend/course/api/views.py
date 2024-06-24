from django.shortcuts import render
from ..models import *
from .serializers import *

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def list(self, request, *args, **kwargs):
        print("Headers:", request.headers)
        return super().list(request, *args, **kwargs)
    
class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer

    def list(self, request, *args, **kwargs):
        print("Headers:", request.headers)
        return super().list(request, *args, **kwargs)
