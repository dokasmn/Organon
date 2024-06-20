from django.db import models

# Create your models here.
from django.db import models
from login.models import CustomUser

class Subject(models.Model):
    subject_name = models.CharField(max_length=30, verbose_name="Título da matéria", unique=True)
    
    def __str__(self):
        return self.subject_name
    
    class Meta:
        ordering = ["subject_name"]
        verbose_name = 'Matéria'
        verbose_name_plural = 'Matérias'

class Content(models.Model):
    content_name = models.CharField(max_length=70, verbose_name="Nome do conteúdo")
    content_description = models.TextField(null=True, blank=True)
    content_subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Matéria do conteúdo")
    content_professor_user = models.ForeignKey('login.Professor_user', on_delete=models.CASCADE, verbose_name="Professor do conteúdo")
    notes = models.ManyToManyField(CustomUser, through='perfil.Note')
    
    def __str__(self):
        return self.content_name
    
    class Meta:
        ordering = ["content_subject"]
        verbose_name = 'Conteúdo'
        verbose_name_plural = 'Conteúdos'