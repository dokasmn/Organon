from rest_framework.viewsets import ModelViewSet
from ..models import Post
from .serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# class PostViewSet(ModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

@api_view(http_method_names=['get','post'])
def list_datas(request):
    queryset = Post.objects.all() #Query
    serializer = PostSerializer(instance=queryset, many=True) #Ler e serializar a query

    return Response(serializer.data)