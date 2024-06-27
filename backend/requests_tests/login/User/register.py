import requests
import os

# Teste de Registro de Usuário
def test_register_user(email, username, password):
    url = f"http://127.0.0.1:8000/login/register/"
    data = {
        "email": email,
        "username": username,
        "password": password,
        "re_password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 201, f"Expected status code 201, but got {response.status_code}"
    print("User registration test passed.")
    print("User registered successfully!")

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("Enter email: ")
    username = input("Enter username: ")
    password = input("Enter password: ")
    test_register_user(email, username, password)