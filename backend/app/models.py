from django.db import models

# Create your models here.
class User(models.Model):
    name=models.CharField(max_length=45)
    age=models.IntegerField()
    msg=models.TextField()
    created_date=models.DateField(auto_now_add=True)
    