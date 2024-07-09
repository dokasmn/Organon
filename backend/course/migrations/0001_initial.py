
import cloudinary.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject_name', models.CharField(max_length=30, unique=True, verbose_name='Título da matéria')),
            ],
            options={
                'verbose_name': 'Matéria',
                'verbose_name_plural': 'Matérias',
                'ordering': ['subject_name'],
            },
        ),
        migrations.CreateModel(
            name='Content',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_name', models.CharField(max_length=70, verbose_name='Nome do conteúdo')),
                ('content_description', models.TextField(blank=True, null=True)),
                ('content_pdf', models.TextField(blank=True, null=True)),
                ('content_video', models.TextField()),
                ('content_professor_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.professor_user', verbose_name='Professor do conteúdo')),
                ('fk_school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.school', verbose_name='Escola')),
            ],
            options={
                'verbose_name': 'Conteúdo',
                'verbose_name_plural': 'Conteúdos',
                'ordering': ['content_subject'],
            },
        ),
    ]
