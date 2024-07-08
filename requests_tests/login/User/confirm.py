import requests
import os

BASE_URL = "http://localhost:8000"

# Teste de Confirmação de E-mail
def test_confirm_email(email, confirmation_code):
    url = f"{BASE_URL}/confirm-email/"
    data = {
        "email": email,
        "confirmation_code": confirmation_code
    }
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        print("E-mail confirmado com sucesso!")
    else:
        print(f"Falha na confirmação de e-mail. Detalhes: {response.json()}")

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("E-mail: ")
    confirmation_code = input("Código de confirmação: ")
    test_confirm_email(email, confirmation_code)
