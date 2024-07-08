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
        
        
BASE_URL = "http://localhost:8000"


def get_access_token(email, password):
    url = f"{BASE_URL}/login/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(f"Login test passed. Token: {response_data['token']}, Is Professor: {response_data['is_professor']}")
    return response_data['token'], response_data['is_professor']


def create_note(access_token, note_title, note_text, note_content):
    url = f'{BASE_URL}/perfil/note/'
    headers = {
        'Authorization': f'Token {access_token}',
        'note-Type': 'application/json'
    }
    payload = {
        'note_title': note_title,
        'note_text': note_text,
        'note_content': note_content,
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response("Create note", response)


def list_notes(access_token):
    url = f'{BASE_URL}/perfil/note/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("List notes", response)


def get_note_by_id(access_token, note_id):
    url = f'{BASE_URL}/perfil/note/{note_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("Get note by ID", response)


def update_note(access_token, note_id, note_title, note_text, note_content):
    url = f'{BASE_URL}/perfil/note/{note_id}/'
    headers = {
        'Authorization': f'Token {access_token}',
        'note-Type': 'application/json'
    }
    payload = {
        'note_title': note_title,
        'note_text': note_text,
        'note_content': note_content,
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response("Update note", response)


def delete_note(access_token, note_id):
    url = f'{BASE_URL}/perfil/note/{note_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete note", response)


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
        opcao = int(input("escolha a opção:\n\
            [1] - create note\n\
            [2] - list note\n\
            [3] - view note\n\
            [4] - update note\n\
            [5] - delete note\n\
            [6] - Sair\n\
        "))
        match opcao:
            case 1:
                new_title = input("informe o nome da anotação: ")
                new_text = input("informe a descrição da anotação: ")
                note_content = input("informe a matéria à qual a anotação pertence: ")
                create_note(token, new_title, new_text, note_content)
            case 2:
                list_notes(token)
            case 3:
                note_id = int(input("id da anotação: "))
                get_note_by_id(token, note_id)
            case 4:
                note_id = int(input("id da anotação: "))
                new_title = input("informe o novo nome da anotação: ")
                new_text = input("informe a nova descrição da anotação: ")
                note_content = input("informe a nova matéria à qual a anotação pertence: ")
                update_note(token, note_id, new_title, new_text, note_content)
            case 5:
                note_id = int(input("id da anotação: "))
                delete_note(token, note_id)
            case 6:
                exit()