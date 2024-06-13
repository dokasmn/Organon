from django.db import models

# Create your models here.    
class Materia(models.Model):
    nome_materia = models.CharField(max_length=100)

class Conteudo(models.Model):
    nome_materia = models.CharField(max_length=100)
    conteudo = models.CharField(max_length=1500)
    fk_materia= models.ForeignKey(Materia, on_delete=models.CASCADE, null=False)
    fk_professor = models

class Usuario_Professor():
    nome_professor = models.CharField(max_length=200)