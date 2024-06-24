import requests

def test_user_registration(email, username, password):
    url = "http://127.0.0.1:8000/auth/users/"
    payload = {
        "email": email,
        "username": username,
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
    assert response_data["email"] == email, f"Expected email {email}, but got {response_data['email']}"
    assert "username" in response_data, "Username not found in response"
    assert response_data["username"] == username, f"Expected username {username}, but got {response_data['username']}"

    print("User registered successfully!")

if __name__ == "__main__":
    email = input("Enter email: ")
    username = input("Enter username: ")
    password = input("Enter password: ")
    test_user_registration(email, username, password)
