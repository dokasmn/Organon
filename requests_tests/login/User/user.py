import requests
import os
import time

BASE_URL = "http://localhost:8000/users/"

def print_response(title, response):
    print("=" * 30 + f" {title} " + "=" * 30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)

def get_access_token(email, password):
    url = "http://localhost:8000/login/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(response_data)
    return response_data['token']

def create_user(access_token, email, username, password):
    url = BASE_URL + "register/"
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    data = {
        "email": email,
        "username": username,
        "password": password,
        "re_password": password
    }
    response = requests.post(url, headers=headers, json=data)
    print_response("Create User", response)

def list_users(access_token):
    url = BASE_URL
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)
    print_response("List Users", response)

def get_user_by_id(access_token, user_id):
    url = BASE_URL + f"{user_id}/"
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("Get User by ID", response)

def update_user(access_token, user_id, email=None, username=None, password=None):
    url = BASE_URL + f"{user_id}/"
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    data = {}
    if email:
        data["email"] = email
    if username:
        data["username"] = username
    if password:
        data["password"] = password
        data["re_password"] = password
    
    response = requests.put(url, headers=headers, json=data)
    print_response("Update User", response)

def delete_user(access_token, user_id):
    url = BASE_URL + f"{user_id}/"
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete User", response)

if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("E-mail: ")
    password = input("Senha: ")
    token = get_access_token(email, password)
    
    while True:
        time.sleep(3)
        os.system("cls" if os.name == "nt" else "clear")
        opcao = int(input("Escolha a opção:\n\
            [1] - Criar usuário\n\
            [2] - Listar usuários\n\
            [3] - Ver usuário por ID\n\
            [4] - Atualizar usuário\n\
            [5] - Deletar usuário\n\
            [6] - Sair\n\
        "))
        
        if opcao == 1:
            new_email = input("Novo e-mail: ")
            new_username = input("Novo username: ")
            new_password = input("Nova senha: ")
            create_user(token, new_email, new_username, new_password)
        
        elif opcao == 2:
            list_users(token)
        
        elif opcao == 3:
            user_id = int(input("ID do usuário: "))
            get_user_by_id(token, user_id)
        
        elif opcao == 4:
            user_id = int(input("ID do usuário: "))
            new_email = input("Novo e-mail (deixe em branco para manter o mesmo): ")
            new_username = input("Novo username (deixe em branco para manter o mesmo): ")
            new_password = input("Nova senha (deixe em branco para manter a mesma): ")
            update_user(token, user_id, new_email, new_username, new_password)
        
        elif opcao == 5:
            user_id = int(input("ID do usuário: "))
            delete_user(token, user_id)
        
        elif opcao == 6:
            exit()

