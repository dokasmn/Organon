import requests

# Obtenção do token
response = requests.post('http://localhost:8000/login/api/token/', data={
    'username': 'dokasmn',
    'password': 'doka#123'
})
tokens = response.json()
access_token = tokens['access']

# Função para printar as respostas de forma organizada
def print_response(title, response):
    print("="*30 + f" {title} " + "="*30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)

# Create - Criar um novo professor_user
response = requests.post('http://localhost:8000/login/professor/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'professor_cpf': '123.456.789-00',
    'professor_auth_user': 1  # Substitua pelo ID do usuário auth relacionado
})
print_response("Create Professor_user", response)

# Read - Listar todos os professor_users
response = requests.get('http://localhost:8000/login/professor/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("List Professor_users", response)

# Read - Recuperar um professor_user específico pelo ID
professor_user_id = 1  # Substitua pelo ID do professor_user que você deseja recuperar
response = requests.get(f'http://localhost:8000/login/professor/{professor_user_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Get Professor_user by ID", response)

# Update - Atualizar completamente um professor_user específico pelo ID
response = requests.put(f'http://localhost:8000/login/professor/{professor_user_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'professor_cpf': '987.654.321-00',
    'professor_auth_user': 1  # Substitua pelo ID do usuário auth relacionado
})
print_response("Update Professor_user", response)

# Update - Atualizar parcialmente um professor_user específico pelo ID
response = requests.patch(f'http://localhost:8000/login/professor/{professor_user_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'professor_cpf': '555.555.555-55'
    # Adicione outros campos conforme necessário
})
print_response("Partial Update Professor_user", response)

# Delete - Deletar um professor_user específico pelo ID
response = requests.delete(f'http://localhost:8000/login/professor/{professor_user_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Delete Professor_user", response)
