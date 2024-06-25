import requests

BASE_URL = "http://127.0.0.1:8000/login/"

def test_confirm_email(email, code):
    url = f"{BASE_URL}confirm-email/"
    data = {
        "email": email,
        "confirmation_code": code
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    print("Email confirmation test passed.")

if __name__ == "__main__":
    email = input("Enter email: ")
    confirmation_code = input("Enter confirmation code: ")
    test_confirm_email(email, confirmation_code)
