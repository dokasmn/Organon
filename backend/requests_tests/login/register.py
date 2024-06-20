import requests

def test_user_registration(email, username, password):
    url = "http://127.0.0.1:8000/auth/users/"
    payload = {
        "email": email,
        "name": username,
        "password": password,
        "re_password": password
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    assert response.status_code == 201, f"Expected status code 201, but got {response.status_code}"
    response_data = response.json()
    assert "email" in response_data, "Email not found in response"
    assert response_data["email"] == payload["email"], f"Expected email {payload['email']}, but got {response_data['email']}"
    assert "name" in response_data, "Name not found in response"
    assert response_data["name"] == payload["name"], f"Expected username {payload['name']}, but got {response_data['name']}"

    print("Usuario registrado!")

if __name__ == "__main__":
    email = input("email: ")
    username = input("username: ")
    password = input("password: ")
    test_user_registration(email,username,password)
