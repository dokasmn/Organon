import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'organon.settings')
django.setup()

from login.models import School, CustomUser, ConfirmationCode, Profession, Academic_Education, Professional_History, Professor_user, SchoolUser
from course.models import *

# Crie uma instância da School
school = School.objects.create(school_name="Escola Exemplo", school_state="SP")

# Crie uma instância do CustomUser
custom_user = CustomUser.objects.create_user(email="user@example.com", username="exampleuser", password="Cavalo@231", fk_school=school)

# Ativar o usuário
custom_user.is_active = True
custom_user.save()

# Crie uma instância do ConfirmationCode
confirmation_code = ConfirmationCode.objects.create(user=custom_user, code="123456", purpose="2fa")

# Crie uma instância da Profession
profession = Profession.objects.create(profession_name="Professor")

# Crie uma instância da Academic_Education
academic_education = Academic_Education.objects.create(degree="Bacharel", training_name="Educação")

# Crie uma instância do Professional_History
professional_history = Professional_History.objects.create(company="Empresa Exemplo", fk_profession=profession)

# Crie uma instância do Professor_user
professor_user = Professor_user.objects.create(professor_auth_user=custom_user, fk_academic_education=academic_education, fk_professional_history=professional_history, fk_school=school)

# Crie uma instância do SchoolUser
school_user = SchoolUser.objects.create(school_auth_user=custom_user, fk_school=school)

list_subjects = [                     
    "Matemática", "Gramática", "Filosofia", "Inglês",
    "Sociologia", "História", "Física", "Química",
    "Biologia", "Artes", "Literatura", "Geografia"
]

for subj in list_subjects:
    Subject.objects.create(subject_name=subj)

print("Instâncias criadas com sucesso!")