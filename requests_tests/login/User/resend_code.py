import requests
import os

BASE_URL = "http://localhost:8000"

# Teste de Reenvio de Código de Confirmação
def test_resend_code(email):
    url = f"{BASE_URL}/resend_code/"
    data = {
        "email": email
    }
    response = requests.post(url, json=data)
    
    if response.status_code == 200:
        print("Novo código de confirmação enviado com sucesso!")
    else:
        print(f"Falha ao reenviar código de confirmação. Detalhes: {response.json()}")

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("E-mail: ")
    test_resend_code(email)