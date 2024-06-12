from django.db import models
from django.contrib.auth.models import User

class Professor_user(models.Model):
    professor_cpf = models.CharField(max_length=14, verbose_name="CPF do professor", unique=True)
    professor_auth_user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['professor_auth_user']
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'

class Note(models.Model):
    note_title = models.CharField(max_length=70, verbose_name="Título da anotação", null=True, blank=True, default="__")
    note_text = models.TextField(verbose_name="Texto da anotação", null=True, blank=True, default="__")
    note_content = models.ForeignKey('home.Content', on_delete=models.CASCADE, verbose_name="Conteúdo da anotação", null=True, blank=True, default="__")
    note_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Usuario da anotação")  # Adicione on_delete
    note_date = models.DateField(auto_now_add=True, blank=True)
    
    def __str__(self):
        return self.note_title
    
    class Meta:
        ordering = ["note_content"]
        verbose_name = 'Anotação'
        verbose_name_plural = 'Anotações'
