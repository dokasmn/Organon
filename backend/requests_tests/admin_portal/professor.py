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


os.system("cls" if os.name == "nt" else "clear")

email = input("email: ")
password = input("password: ")

if response_data.get('is_school_user'):
    print("School User")
    
    url_professor = f'http://localhost:8000/admin_portal/professor/'
    professor_data = {
        "professor_auth_user":2,
        "fk_professional_history":1,
        "fk_academic_education": None
    }
    response = requests.post(url_professor, json=professor_data)
    response_data = response.json()
    print(response_data)
    
    
if __name__ == "__main__":
    os.system("cls" if os.name == "nt" else "clear")
    email = input("email: ")
    password = input("password: ")
    token, is_school_user, is_professor = get_access_token(email, password)
    
    
    
    while True:
        time.sleep(3)
        os.system("cls" if os.name == "nt" else "clear")
        try:
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
                    validacao_conhecimento = 
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

