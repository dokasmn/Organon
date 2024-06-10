# Generated by Django 5.0.6 on 2024-06-06 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45)),
                ('age', models.IntegerField()),
                ('msg', models.TextField()),
                ('created_date', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
