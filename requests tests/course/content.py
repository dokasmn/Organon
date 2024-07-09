import requests
import os
import time

def print_response(title, response):
    print("="*30 + f" {title} " + "="*30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)


def get_access_token(email, password):
    url = f"http://localhost:8000/login/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(f"Login test passed. Token: {response_data['token']}, Is Professor: {response_data['is_professor']}")
    return response_data['token'], response_data['is_professor']


def create_content(access_token, content_name, content_description, content_subject, content_professor_user_id):
    url = 'http://localhost:8000/home/content/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': content_name,
        'content_description': content_description,  # isto deverá ser o vídeo, talvez
        'content_subject': content_subject,
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response("Create Content", response)


def list_contents(access_token):
    url = 'http://localhost:8000/home/content/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("List Contents", response)


def get_content_by_id(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("Get Content by ID", response)


def update_content(access_token, content_id, new_name, new_description, new_content_subject):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': new_name,
        'content_description': new_description,
        'content_subject': new_content_subject,
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response("Update Content", response)


def delete_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete Content", response)


if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("email: ")
    password = input("password: ")
    token, is_professor = get_access_token(email, password)
    
    if not is_professor:
        print("Somente professores podem acessar esta aplicação.")
        exit()
    
    while True:
        time.sleep(3)
        os.system("cls" if os.name == "nt" else "clear")
        try:
            opcao = int(input("escolha a opção:\n\
                [1] - create content\n\
                [2] - list content\n\
                [3] - view content\n\
                [4] - update content\n\
                [5] - delete content\n\
                [6] - Sair\n\
            "))
            
            match opcao:
                case 1:
                    new_name = input("informe o nome do conteúdo: ")
                    new_description = input("informe a descrição do conteúdo: ")
                    new_content_subject = input("informe a matéria à qual o conteúdo pertence: ")
                    content_professor_user_id = input("informe o id do professor que cria o conteúdo: ")
                    create_content(token, new_name, new_description, new_content_subject, content_professor_user_id)
                case 2:
                    list_contents(token)
                case 3:
                    content_id = int(input("id do conteúdo: "))
                    get_content_by_id(token, content_id)
                case 4:
                    content_id = int(input("id do conteúdo: "))
                    new_name = input("informe o novo nome do conteúdo: ")
                    new_description = input("informe a nova descrição do conteúdo: ")
                    new_content_subject = input("informe a nova matéria à qual o conteúdo pertence: ")
                    update_content(token, content_id, new_name, new_description, new_content_subject)
                case 5:
                    content_id = int(input("id do conteúdo: "))
                    delete_content(token, content_id)
                case 6:
                    exit()
        except:
            print("\ndeu erro")