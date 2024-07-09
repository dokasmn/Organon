import requests
import os

BASE_URL = "http://localhost:8000/login/"  # Substitua pela URL correta do seu servidor

# Teste de Registro de Usuário utilizando o método 'register' do CustomUserViewSet
def test_register_user(email, username, password):
    url = f"{BASE_URL}user/register/"  # Substitua pela URL correta da sua API de usuários
    data = {
        "email": email,
        "username": username,
        "password": password,
    }
    response = requests.post(url, json=data)
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