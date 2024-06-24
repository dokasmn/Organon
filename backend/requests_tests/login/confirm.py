import requests

def test_confirm_user(email, confirmation_code):
    url = "http://127.0.0.1:8000/auth/confirm-email/"
    payload = {
        "email": email,
        "confirmation_code": confirmation_code
    }

    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)

    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    assert "token" in response_data, "Token not found in response"

    print("User confirmed successfully!")

if __name__ == "__main__":
    email = input("Enter email: ")
    confirmation_code = input("Enter confirmation code: ")
    test_confirm_user(email, confirmation_code)
