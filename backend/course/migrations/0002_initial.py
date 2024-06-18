# Generated by Django 4.2.13 on 2024-06-17 19:58

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('course', '0001_initial'),
        ('perfil', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='notes',
            field=models.ManyToManyField(through='perfil.Note', to=settings.AUTH_USER_MODEL),
        ),
    ]
