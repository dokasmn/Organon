


from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Academic_Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree', models.CharField(max_length=30)),
                ('training_name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Profession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('profession_name', models.CharField(max_length=45)),
            ],
        ),
        migrations.CreateModel(
            name='Professor_user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('professor_auth_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Professor',
                'verbose_name_plural': 'Professores',
                'ordering': ['professor_auth_user'],
            },
        ),
        migrations.CreateModel(
            name='Professional_History',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=40, verbose_name='Compania/Empresa')),
                ('fk_profession', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.profession', verbose_name='Professor')),
            ],
        ),
    ]
