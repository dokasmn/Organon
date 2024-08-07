from django.db import models
from login.models import CustomUser
from course.models import Content

class Note(models.Model):
    note_title = models.CharField(max_length=70, verbose_name="Título da anotação", null=True, blank=True, default="---")
    note_text = models.TextField(verbose_name="Texto da anotação", null=True, blank=True, default="---")
    note_content = models.ForeignKey('course.Content', on_delete=models.CASCADE, verbose_name="Conteúdo da anotação")
    note_user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Usuario da anotação")
    note_date = models.DateField(auto_now_add=True, blank=True)
    
    def __str__(self):
        return self.note_title
    
    class Meta:
        ordering = ["note_content"]
        verbose_name = 'Anotação'
        verbose_name_plural = 'Anotações'
