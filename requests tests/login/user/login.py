import requests
import os

BASE_URL = "http://localhost:8000/login/user"

# Teste de Rota personalizada para login de usuário
def test_login_user_custom_route(email, password):
    url = f'{BASE_URL}/login/'
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        print("Login realizado com sucesso!")
        print(f"Token: {response.json().get('token')}")
    else:
        print(f"Falha ao realizar login. Detalhes: {response.json()}")

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("E-mail: ")
    password = input("Password: ")
    test_login_user_custom_route(email, password)
