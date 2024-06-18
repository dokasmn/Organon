import requests

def auth_user(email, password):  
    response = requests.post('http://localhost:8000/login/api/token/', data={
        'email': email,
        'password': password,
    })
    print(response)
    tokens = response.json()
    print(tokens)
    if 'access' in tokens:
        print("Você está logado")
    else:
        print("Usuário não encontrado ou senha incorreta")
    return tokens.get('access', None)

def get_user_profile(access_token):
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    response = requests.get('http://localhost:8000/login/api/get_user_data/', headers=headers)
    datas = response.json() 
    print(response.status_code)
    if response.status_code == 200:
        print(datas)
    else:
        print("Erro ao obter perfil do usuário")
    return datas

email = input("Email: ")
password = input("Password: ")

my_token = auth_user(email, password)

if my_token:
    get_user_profile(my_token)
