import requests
import os

BASE_URL = "http://localhost:8000"

# Teste de Login de Usuário
def test_login_user(email, password):
    url = f"{BASE_URL}/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    response_data = response.json()
    print(response_data)
    if response.status_code == 200:
        print(f"Login bem-sucedido. Token: {response_data['token']}, Email: {response_data['email']}")
    else:
        print(f"Falha no login. Detalhes: {response_data['detail']}")

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("Email: ")
    password = input("Senha: ")
    test_login_user(email, password)
