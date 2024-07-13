from login.models import *

from django.db import models
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
    content_date = models.DateTimeField(auto_now_add=True, blank=True)
    content_pdf = CloudinaryField('pdf')
    content_video = CloudinaryField('video')
    content_subject = models.ForeignKey(Subject, on_delete=models.CASCADE, verbose_name="Matéria do conteúdo")
    content_professor_user = models.ForeignKey('login.Professor_user', on_delete=models.CASCADE, verbose_name="Professor do conteúdo")
    content_user = models.ManyToManyField(CustomUser, through='perfil.Note')
    content_position = models.IntegerField()
    fk_school = models.ForeignKey(School, on_delete=models.CASCADE, verbose_name="Escola")


    def __str__(self):
        return self.content_name

    
    def save(self, *args, **kwargs):
        objects = Content.objects.all()
        
        for obj in objects:
            if obj.content_position >= self.content_position:
                obj.content_position += 1
                obj.save()

        super(Content, self).save(*args, **kwargs) 

                
    def delete(self, *args, **kwargs):
        objects  = Content.objects.all()
        for obj in objects:
            if obj.content_position >= self.content_position:
                obj.content_position -= 1
                obj.save()
        super(Content, self).delete(*args, **kwargs) 
        
    
    class Meta:
        ordering = ["content_date"]
        verbose_name = 'Conteúdo'
        verbose_name_plural = 'Conteúdos'
      
      
      
class Comment(models.Model):
    comment_text = models.CharField(max_length=160, verbose_name="texto do comentário")
    comment_date = models.DateTimeField(auto_now_add=True)
    fk_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Usuario do comentário")
    fk_content = models.ForeignKey(Content, on_delete=models.CASCADE, verbose_name="Conteudo do comentário")

    def __str__(self):
        return self.comment_text

    class Meta:
        ordering = ["comment_date"]
        verbose_name = "Comentário"
        verbose_name_plural = "Comentários"        
        
