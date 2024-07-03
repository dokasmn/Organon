from rest_framework import permissions
from login.models import SchoolUser

class IsProfessorOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.professor_auth_user == request.user
    
class IsSchoolAdmin(permissions.BasePermission):
    def has_obj_permission(self, request, view, obj):
        return obj.school_auth_user == request.user