# Create your models here.
from django.db import models
from login.models import CustomUser
from cloudinary.models import CloudinaryField

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
    content_pdf = CloudinaryField('pdf')
    content_video = CloudinaryField('video')
    content_subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Matéria do conteúdo")
    content_professor_user = models.ForeignKey('login.Professor_user', on_delete=models.CASCADE, verbose_name="Professor do conteúdo")
    content_user = models.ManyToManyField(CustomUser, through='perfil.Note')
    content_position = models.IntegerField()


    def __str__(self):
        return self.content_name

    
    def save(self, *args, **kwargs):
        objects = Content.objects.all()
        for obj in objects:
            if obj.content_position > self.content_position:
                obj.content_position += 1
                obj.save()

                
    def delete(self, *args, **kwargs):
        objects  = Content.objects.all()
        for obj in objects:
            if obj.content_position > self.content_position:
                obj.content_position -= 1
                obj.save()
        
    
    class Meta:
        ordering = ["content_subject"]
        verbose_name = 'Conteúdo'
        verbose_name_plural = 'Conteúdos'