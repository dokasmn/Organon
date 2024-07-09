
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course', '0001_initial'),
        ('perfil', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='content',
            name='notes',
            field=models.ManyToManyField(through='perfil.Note', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='content',
            name='content_subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course.subject', verbose_name='Matéria do conteúdo'),
        ),
    ]
