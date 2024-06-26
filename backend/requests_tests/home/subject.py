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
    return response_data['token']


def list_subjects(access_token):
    url = 'http://localhost:8000/home/subject/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("List Subjects", response)


def create_subject(access_token, subject_name):
    url = 'http://localhost:8000/home/subject/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'subject_name': subject_name
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response("Create Subject", response)


def update_subject(access_token, subject_id, new_name):
    url = f'http://localhost:8000/home/subject/{subject_id}/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'subject_name': new_name
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response("Update Subject", response)


def delete_subject(access_token, subject_id):
    url = f'http://localhost:8000/home/subject/{subject_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete Subject", response)


if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("email: ")
    password = input("password: ")
    token = get_access_token(email, password)
    
    while True:
        time.sleep(3)
        os.system("cls" if os.name == "nt" else "clear")
        opcao = int(input("escolha a opção:\n\
            [1] - list subjects\n\
            [2] - create subject\n\
            [3] - update subject\n\
            [4] - delete subject\n\
            [5] - Sair\n\
        "))
        
        match opcao:
            case 1:
                list_subjects(token)
            case 2:
                subject_name = input("informe o nome do matéria: ")
                create_subject(token, subject_name)
            case 3:
                subject_id = int(input("id do matéria: "))
                new_name = input("informe o novo nome do matéria: ")
                update_subject(token, subject_id, new_name)
            case 4:
                subject_id = int(input("id do matéria: "))
                delete_subject(token, subject_id)
            case 5:
                exit()
