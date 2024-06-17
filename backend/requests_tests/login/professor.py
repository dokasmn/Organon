import requests
from .auth_user import auth_user, print_response, get_user_profile

print("Login de professor")
username = input("username: ")
password = input("password: ")
access_token = auth_user(username, password)

if access_token:
    user_profile = get_user_profile(access_token)
    if user_profile['role'] == 'professor':
        option = int(input("Informe sua opção: \n [1]-Mudar seus dados \n [2]-Deletar minha conta"))
        if option == 1:
            professor_user_id = user_profile['id']
            response = requests.put(f'http://localhost:8000/api/professor/{professor_user_id}/', headers={
                'Authorization': f'Bearer {access_token}',
                'Content-Type': 'application/json'
            }, json={
                'professor_auth_user': user_profile['user_id']
            })
            print_response("Update Professor_user", response)
        elif option == 2:
            professor_user_id = user_profile['id']
            response = requests.delete(f'http://localhost:8000/api/professor/{professor_user_id}/', headers={
                'Authorization': f'Bearer {access_token}'
            })
            print_response("Delete Professor_user", response)
    else:
        print("Você não tem permissão para realizar essas operações.")
else:
    print("Falha na autenticação.")
