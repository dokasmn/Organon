from django.db import models
from django.contrib.auth.models import User

class Professor_user(models.Model):
    professor_auth_user = models.OneToOneField(User, on_delete=models.CASCADE)    
    class Meta:
        ordering = ['professor_auth_user']
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'

class Profession(models.Model):
    profession_name = models.CharField(max_length=45)

class Professional_History(models.Model):
    company = models.CharField(max_length=40,verbose_name="Compania/Empresa")
    fk_profession = models.ForeignKey(Profession, on_delete=models.CASCADE,verbose_name="Professor",null=True,blank=True)

class Academic_Education(models.Model):
    degree = models.CharField(max_length=30)
    training_name = models.CharField(max_length=30)
    
