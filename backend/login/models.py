from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string

import random
import string

class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')

        if not username:
            raise ValueError('The username field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, username, password, **extra_fields)


class CustomUser(AbstractBaseUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    confirmation_code = models.CharField(max_length=5, blank=True, null=True)
    confirmation_code_created_at = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    def generate_confirmation_code(self):
        self.confirmation_code = get_random_string(length=6, allowed_chars='0123456789')
        self.confirmation_code_created_at = timezone.now()
        self.save()

class Profession(models.Model):
    profession_name = models.CharField(max_length=45)

class Academic_Education(models.Model):
    degree = models.CharField(max_length=30)
    training_name = models.CharField(max_length=30)

class Professional_History(models.Model):
    company = models.CharField(max_length=40,verbose_name="Compania/Empresa")
    fk_profession = models.ForeignKey(Profession, on_delete=models.CASCADE,verbose_name="Professor",null=True,blank=True)

class Professor_user(models.Model):
    professor_auth_user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)    
    fk_academic_education = models.ForeignKey(Academic_Education, on_delete= models.CASCADE,verbose_name="Academic Formation",null=True,blank=True)
    fk_professional_history = models.ForeignKey(Professional_History, on_delete=models.CASCADE,verbose_name="Professional History",null=True,blank=True)
    class Meta:
        ordering = ['professor_auth_user']
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'