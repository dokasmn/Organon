# from ..models import *
# from .serializers import *
# from ..api.utils import *
# from login.models import Professor_user

# # from login.models import Professor_user

# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework import status

# # Professor classes
# class ProfessorUserAPIView(APIView):
#     def get(self, request, pk=None):
#         if pk is None:
#             return Response(serializer.data)
#         else:
#             try:
#                 # professor = Professor_user.objects.get(pk=pk)
#                 # serializer = ProfessorUserSerializer(professor)
#                 return Response(serializer.data)
#             except Professor_user.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
        
    
#     def post(self, request):
#         serializer = ProfessorUserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         try:
#             professor = Professor_user.objects.get(pk=pk)
#             serializer = ProfessorUserSerializer(professor, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Professor_user.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             professor = Professor_user.objects.get(pk=pk)
#             professor.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Professor_user.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)
    
# # Note classes
# class NoteAPIView(APIView):
#     def get(self, request, pk=None):
#         if pk is None:
#             notes = Note.objects.all()
#             serializer = NoteSerializer(notes, many=True)
#             return Response(serializer.data)
#         else:
#             try:
#                 note = Note.objects.get(pk=pk)
#                 serializer = NoteSerializer(note)
#                 return Response(serializer.data)
#             except Note.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)

#     def post(self, request):
#         serializer = NoteSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def put(self, request, pk):
#         try:
#             note = Note.objects.get(pk=pk)
#             serializer = NoteSerializer(note, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except Note.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def delete(self, request, pk):
#         try:
#             note = Note.objects.get(pk=pk)
#             note.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Note.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

    
    
    

    
