import requests

def print_response(title, response):
    print("="*30 + f" {title} " + "="*30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)


def get_access_token(email, password):
    url = f"http://localhost:8000/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(f"Login test passed. Token: {response_data['token']}, Is Professor: {response_data['is_professor']}")
    return response_data['token']


def create_content(access_token):
    url = 'http://localhost:8000/home/content/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': 'Introdução à História',
        'content_description': 'Este conteúdo introduz os principais conceitos da história mundial.',
        'content_subject': 3,
        'content_professor_user': 1 
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response("Create Content", response)
    
    
def list_contents(access_token):
    url = 'http://localhost:8000/home/content/'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("List Contents", response)
    

def get_content_by_id(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("Get Content by ID", response)
    
    
def update_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': 'Introdução à Geografia',
        'content_description': 'Este conteúdo introduz os principais conceitos da geografia mundial.',
        'content_subject': 1,
        'content_professor_user': 1
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response("Update Content", response)
    
    
def partial_update_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': 'Novo conteúdo'
    }
    response = requests.patch(url, headers=headers, json=payload)
    print_response("Partial Update Content", response)


def delete_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete Content", response)



import requests

def print_response(title, response):
    print("="*30 + f" {title} " + "="*30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)


def get_access_token(email, password):
    url = f"http://localhost:8000/auth/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    assert response.status_code == 200, f"Expected status code 200, but got {response.status_code}"
    response_data = response.json()
    print(f"Login test passed. Token: {response_data['token']}, Is Professor: {response_data['is_professor']}")
    return response_data['token']


def create_content(access_token):
    url = 'http://localhost:8000/home/content/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': 'Introdução à História',
        'content_description': 'Este conteúdo introduz os principais conceitos da história mundial.',
        'content_subject': 3,
        'content_professor_user': 1 
    }
    response = requests.post(url, headers=headers, json=payload)
    print_response("Create Content", response)
    
    
def list_contents(access_token):
    url = 'http://localhost:8000/home/content/'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("List Contents", response)
    

def get_content_by_id(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get(url, headers=headers)
    print_response("Get Content by ID", response)
    
    
def update_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': 'Introdução à Geografia',
        'content_description': 'Este conteúdo introduz os principais conceitos da geografia mundial.',
        'content_subject': 1,
        'content_professor_user': 1
    }
    response = requests.put(url, headers=headers, json=payload)
    print_response("Update Content", response)
    
    
def partial_update_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'content_name': 'Novo conteúdo'
    }
    response = requests.patch(url, headers=headers, json=payload)
    print_response("Partial Update Content", response)


def delete_content(access_token, content_id):
    url = f'http://localhost:8000/home/content/{content_id}/'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.delete(url, headers=headers)
    print_response("Delete Content", response)



if __name__ == "__main__":
    email = input("email: ")
    password = input("password: ")
    token = get_access_token(email, password)
    opcao = int(input("escolha a opção:\n\
        [1] - create comtent\n\
        [2] - list content\n\
        [3] - view content\n\
        [4] - update content\n\
        [5] - update partial_content\n\
        [6] - delete content\n\
    "))
    
    match opcao:
        case 1:
            create_content(token)
        case 2:
            list_contents(token)
        case 3:
            content_id = int(input("id content: "))
            get_content_by_id(token, content_id)
        case 4:
            content_id = int(input("id content: "))
            update_content(token, content_id)
        case 5:
            content_id = int(input("id content: "))
            partial_update_content(token, content_id)
        case 6:
            content_id = int(input("id content: "))
            delete_content(token, content_id)
