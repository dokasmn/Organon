import requests
import os

os.system("cls" if os.name == "nt" else "clear")

email = input("email: ")
password = input("password: ")

url_login = f"http://localhost:8000/login/auth/login/"
data = {
    "email": email,
    "password": password
}

response = requests.post(url_login, json=data)
response_data = response.json()
print(response_data)

if response_data.get('is_school_user'):
    print("School User")
    
    url_professor = f'http://localhost:8000/admin_portal/professor/'
    professor_data = {
        "professor_auth_user":2,
        "fk_professional_history":1,
        "fk_academic_education": None
    }
    response = requests.post(url_professor, json=professor_data)
    response_data = response.json()
    print(response_data)

