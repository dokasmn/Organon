# Generated by Django 5.0.6 on 2024-07-14 00:34

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('note_title', models.CharField(blank=True, default='---', max_length=70, null=True, verbose_name='Título da anotação')),
                ('note_text', models.TextField(blank=True, default='---', null=True, verbose_name='Texto da anotação')),
                ('note_date', models.DateField(auto_now_add=True)),
                ('note_content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.content', verbose_name='Conteúdo da anotação')),
                ('note_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario da anotação')),
            ],
            options={
                'verbose_name': 'Anotação',
                'verbose_name_plural': 'Anotações',
                'ordering': ['note_content'],
            },
        ),
    ]
