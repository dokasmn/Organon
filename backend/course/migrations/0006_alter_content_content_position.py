# Generated by Django 5.0.6 on 2024-07-07 00:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0005_content_content_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='content_position',
            field=models.IntegerField(),
        ),
    ]