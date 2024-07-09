# Generated by Django 5.0.6 on 2024-07-09 01:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0006_alter_content_content_position'),
        ('perfil', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.CharField(max_length=160, verbose_name='texto do comentário')),
                ('comment_date', models.DateTimeField(auto_now_add=True)),
                ('comment_content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.content', verbose_name='Conteudo do comentário')),
                ('comment_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Usuario do comentário')),
            ],
            options={
                'verbose_name': 'Comentário',
                'verbose_name_plural': 'Comentários',
                'ordering': ['comment_date'],
            },
        ),
    ]