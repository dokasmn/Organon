import requests

def auth_user(username, password):  
    response = requests.post('http://localhost:8000/api/token/', data={
        'username': username,
        'password': password,
    })
    tokens = response.json()
    if 'access' in tokens:
        print("Você está logado")
    else:
        print("Usuário não encontrado")
    return tokens.get('access', None)

def get_user_profile(access_token):
    response = requests.get('http://localhost:8000/api/user_profile/', headers={
        'Authorization': f'Bearer {access_token}'
    })
    return response.json()

def print_response(title, response):
    print("="*30 + f" {title} " + "="*30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)
