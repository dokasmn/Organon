from rest_framework import permissions
from login.models import SchoolUser, Professor_user

class IsProfessorOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.professor_auth_user == request.user
    
class IsProfessorByContent(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        professor_user = Professor_user.objects.get(id=obj.content_professor_user.id)
        return professor_user.professor_auth_user == request.user
    
class IsSchoolAdmin(permissions.BasePermission):
    def has_obj_permission(self, request, view, obj):
        return obj.school_auth_user == request.user