import requests
import os

BASE_URL = "http://localhost:8000/login/user"  # Substitua pela URL correta do seu servidor

# Teste de Registro de Usuário utilizando o método 'register' do CustomUserViewSet
def test_register_user(email, username, password):
    url = f"{BASE_URL}/register/"  # Substitua pela URL correta da sua API de usuários
    payload = {
        "email": email,
        "username": username,
        "password": password,
        "re_password": password
    }
    headers = {
        'Content-Type': 'application/json'
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 201:
        print("Usuário registrado com sucesso!")
    else:
        print(f"Falha no registro. Detalhes: {response.json()}")

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("Email: ")
    username = input("Nome de usuário: ")
    password = input("Senha: ")
    test_register_user(email, username, password)