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
    print(response_data)
    return response_data['token']


def create_professor(access_token, auth_user_id, fk_professional_history=None, fk_academic_education=None):
    url = f'http://localhost:8000/admin_portal/professor/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        "professor_auth_user":auth_user_id,
        "fk_professional_history":fk_professional_history,
        "fk_academic_education": fk_academic_education
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response("Create Professor", response)
    
    
    
def list_professors(access_token):
    url = 'http://localhost:8000/admin_portal/professor/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)
    print_response("List Professors", response)
    
    
def get_professor_by_id(access_token, professor_id):
    url = f'http://localhost:8000/admin_portal/professor/{professor_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("Get professor by id", response)
    
    
def update_professor(access_token, professor_id, fk_professional_history=None, fk_academic_education=None):
    url = f'http://localhost:8000/admin_portal/professor/{professor_id}/'
    headers = {
        'Authorization': f'Token {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'fk_professional_history': fk_professional_history,
        'fk_academic_education': fk_academic_education
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response("Update Professor", response)
    
    
def delete_professor(access_token, professor_id):
    url = f'http://localhost:8000/admin_portal/professor/{professor_id}/'
    headers = {
        'Authorization': f'Token {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete Professor", response)
    
if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("email: ")
    password = input("password: ")
    token = get_access_token(email, password)
    
    while True:
        time.sleep(3)
        os.system("cls" if os.name == "nt" else "clear")
        opcao = int(input("escolha a opção:\n\
            [1] - create professor\n\
            [2] - list professor\n\
            [3] - view professor\n\
            [4] - update professor\n\
            [5] - delete professor\n\
            [6] - Sair\n\
        "))
        
        match opcao:
            case 1:
                auth_user = int(input("informe o id do user: "))
                validacao_capacitacao = int(input("escolha a opção:\n\
                    [1] - informar histórico profissional\n\
                    [2] - informar formação academica\n\
                "))
                match validacao_capacitacao:
                    case 1:
                        fk_professional_history = int(input("Informe o id da profisssão: "))
                        create_professor(token, auth_user, fk_professional_history=fk_professional_history)
                    case 2:
                        fk_academic_education =  int(input("informe o id do histórico academico: "))
                        create_professor(token, auth_user, fk_academic_education=fk_academic_education)
            case 2:
                print(token)
                list_professors(token)
            case 3:
                professor_id = int(input("informe o id do professor: "))
                get_professor_by_id(token, professor_id)
            case 4:
                professor_id = int(input("informe o id do professor: "))
                validacao_capacitacao = int(input("escolha a opção:\n\
                    [1] - informar histórico profissional\n\
                    [2] - informar formação academica\n\
                "))
                match validacao_capacitacao:
                    case 1:
                        fk_professional_history = int(input("Informe o id da profisssão: "))
                        update_professor(token, professor_id, fk_professional_history=fk_professional_history)
                    case 2:
                        fk_academic_education =  int(input("informe o id do histórico academico: "))
                        update_professor(token, professor_id, fk_academic_education=fk_academic_education)
            case 5:
                professor_id = int(input("informe o id do professor: "))
                delete_professor(token, professor_id)
            case 6:
                exit()

