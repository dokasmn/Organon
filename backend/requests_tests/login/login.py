import requests

def test_user_login(email, password):
    url = "http://127.0.0.1:8000/auth/token/login/"
    payload = {
        "email": email,
        "password": password
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    assert "token" in response_data, "Token not found in response"

    print("User logged in successfully!")

if __name__ == "__main__":
    email = input("Enter email: ")
    password = input("Enter password: ")
    test_user_login(email, password)
