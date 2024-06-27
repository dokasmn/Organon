import requests
import os

BASE_URL = "http://127.0.0.1:8000/login/"

def test_confirm_email(email, code):
    url = f"{BASE_URL}confirm-email/"
    data = {
        "email": email,
        "confirmation_code": code
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Email confirmation test passed.")
    else:
        print(f"Error: {response.status_code}")
        print(response.json())

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("Enter email: ")
    confirmation_code = input("Enter confirmation code: ")
    test_confirm_email(email, confirmation_code)
