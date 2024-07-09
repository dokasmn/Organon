import requests
import os

BASE_URL = "http://localhost:8000/users/"

# Teste de Rota personalizada para enviar código de confirmação para atualização de senha
def test_invite_update_password_auth(user_id):
    url = f"{BASE_URL}{user_id}/invite_update_password_auth/"
    response = requests.get(url)
    if response.status_code == 200:
        print("Código de confirmação enviado com sucesso!")
    else:
        print(f"Falha ao enviar código de confirmação. Detalhes: {response.json()}")
        

def test_set_password(user_id, new_password, confirmation_code):
    url = f"{BASE_URL}{user_id}/set_password/"
    data = {
        "new_password": new_password,
        "confirmation_code": confirmation_code
    }
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("Senha atualizada com sucesso!")
    else:
        print(f"Falha ao atualizar senha. Detalhes: {response.json()}")
        

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    user_id = input("ID do usuário: ")
    test_invite_update_password_auth(user_id)
    new_password = input("\nNova senha: ")
    confirmation_code = input("\nCódigo de confirmação\n: ")
    test_set_password(user_id, new_password, confirmation_code)