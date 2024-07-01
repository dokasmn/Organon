# test_requests.py
import requests

BASE_URL = "http://127.0.0.1:8000/login/"

# Teste de Login de Usuário
def test_login_user(email, password):
    url = f"http://localhost:8000/login/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(response_data)
    print(f"Login test passed. Token: {response_data['token']}, Is Professor: {response_data['is_professor']}")
    return response_data['token'], response_data['is_professor']

if __name__ == "__main__":
    email = input("email: ")
    password = input("password: ")
    test_login_user(email, password)
