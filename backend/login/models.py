from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class CustomUserManager(BaseUserManager):
    def create_user(self, email, name,password=None):
        if not email:
            raise ValueError('O endereço de email deve ser fornecido')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

class Professor_user(models.Model):
    professor_auth_user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)    
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
