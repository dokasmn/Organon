

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(max_length=30)),
                ('is_active', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
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
            name='School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school_name', models.CharField(max_length=255, unique=True)),
                ('school_state', models.CharField(choices=[('SC', 'Santa Catarina'), ('RS', 'Rio Grande do Sul'), ('PR', 'Paraná'), ('SP', 'São Paulo'), ('MT', 'Mato Grosso'), ('MS', 'Mato Grosso do Sul'), ('RJ', 'Rio de Janeiro'), ('MG', 'Minas Gerais'), ('GO', 'Goiás'), ('DF', 'Distrito Federal'), ('ES', 'Espírito Santo'), ('BA', 'Bahia'), ('PE', 'Pernanbuco'), ('MA', 'Maranhão'), ('AL', 'Alagoas'), ('RN', 'Rio Grande do Norte'), ('PB', 'Paaraíba'), ('CE', 'Ceará'), ('SE', 'Sergipe'), ('PI', 'Piauí'), ('TO', 'Tocantins'), ('PA', 'Pará'), ('AP', 'Amapá'), ('RO', 'Rondônia'), ('RR', 'Roraima'), ('AM', 'Amazonas'), ('AC', 'Acre')], max_length=2)),
            ],
            options={
                'verbose_name': 'Escola',
                'ordering': ['school_name'],
            },
        ),
        migrations.CreateModel(
            name='ConfirmationCode',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=6)),
                ('purpose', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='confirmation_codes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Professional_History',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company', models.CharField(max_length=40, verbose_name='Compania/Empresa')),
                ('fk_profession', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.profession', verbose_name='Professor')),
            ],
        ),
        migrations.CreateModel(
            name='Professor_user',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fk_academic_education', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.academic_education', verbose_name='Formação acadêmica')),
                ('fk_professional_history', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='login.professional_history', verbose_name='Histórico professional')),
                ('professor_auth_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('fk_school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.school', verbose_name='Escola')),
            ],
            options={
                'verbose_name': 'Professor',
                'ordering': ['professor_auth_user'],
            },
        ),
        migrations.AddField(
            model_name='customuser',
            name='fk_school',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.school', verbose_name='Escola'),
        ),
        migrations.CreateModel(
            name='SchoolUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fk_school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='login.school', verbose_name='Escola')),
                ('school_auth_user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Admin escolar',
                'ordering': ['school_auth_user'],
            },
        ),
    ]
