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
    print(response.json())

# Create - Criar um novo professor
response = requests.post('http://localhost:8000/login/professor/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'name': 'John Doe',
    'email': 'john.doe@example.com'
    # Adicione outros campos conforme necessário
})
print_response("Create Professor", response)

# Read - Listar todos os professores
response = requests.get('http://localhost:8000/login/professor/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("List Professors", response)

# Read - Recuperar um professor específico pelo ID
professor_id = 1  # Substitua pelo ID do professor que você deseja recuperar
response = requests.get(f'http://localhost:8000/login/professor/{professor_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Get Professor by ID", response)

# Update - Atualizar completamente um professor específico pelo ID
response = requests.put(f'http://localhost:8000/login/professor/{professor_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'name': 'John Updated',
    'email': 'john.updated@example.com'
    # Adicione outros campos conforme necessário
})
print_response("Update Professor", response)

# Update - Atualizar parcialmente um professor específico pelo ID
response = requests.patch(f'http://localhost:8000/login/professor/{professor_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'email': 'john.newemail@example.com'
    # Adicione outros campos conforme necessário
})
print_response("Partial Update Professor", response)

# Delete - Deletar um professor específico pelo ID
response = requests.delete(f'http://localhost:8000/login/professor/{professor_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Delete Professor", response)
