from django.db import models
from django.contrib.auth.models import User

class Professor_user(models.Model):
    professor_cpf = models.CharField(max_length=14, verbose_name="CPF do professor", unique=True)
    professor_auth_user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['professor_auth_user']
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'
