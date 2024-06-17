from django.db import models
from django.contrib.auth.models import User

class Professor_user(models.Model):
    professor_auth_user = models.OneToOneField(User, on_delete=models.CASCADE)
    class Meta:
        ordering = ['professor_auth_user']
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'

