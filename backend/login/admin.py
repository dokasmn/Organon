from django.contrib import admin
from .models import Professor_user

class ProfessorUserAdmin(admin.ModelAdmin):
    list_display = ['professor_auth_user']  # Colunas a serem exibidas na lista
    search_fields = ['professor_auth_user__username']  # Campos para a busca
    list_filter = ('professor_auth_user__is_staff', 'professor_auth_user__is_active')  # Filtros

admin.site.register(Professor_user, ProfessorUserAdmin)
