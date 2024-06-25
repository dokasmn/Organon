from rest_framework import permissions

class IsProfessorOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.content_professor_user == request.user