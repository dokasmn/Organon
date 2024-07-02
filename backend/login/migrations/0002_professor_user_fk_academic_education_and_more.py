# Generated by Django 5.0.6 on 2024-06-29 17:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='professor_user',
            name='fk_academic_education',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.academic_education', verbose_name='Academic Formation'),
        ),
        migrations.AddField(
            model_name='professor_user',
            name='fk_professional_history',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.professional_history', verbose_name='Professional History'),
        ),
    ]
