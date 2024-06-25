# test_requests.py
import requests

BASE_URL = "http://127.0.0.1:8000/login/"

# Teste de Login de Usuário
def test_login_user(email, password):
    url = f"{BASE_URL}auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(f"Login test passed. Token: {response_data['token']}, Is Professor: {response_data['is_professor']}")

if __name__ == "__main__":
    email = input("email: ")
    password = input("password: ")
    test_login_user(email, password)
