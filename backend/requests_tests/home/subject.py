import requests

# Obtenção do token
response = requests.post('http://localhost:8000/api/token/', data={
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

# Create - Criar um novo subject
response = requests.post('http://localhost:8000/home/subject/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'name': 'Mathematics',
    'description': 'An advanced course on algebra and calculus'
    # Adicione outros campos conforme necessário
})
print_response("Create Subject", response)

# Read - Listar todos os subjects
response = requests.get('http://localhost:8000/home/subject/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("List Subjects", response)

# Read - Recuperar um subject específico pelo ID
subject_id = 1  # Substitua pelo ID do subject que você deseja recuperar
response = requests.get(f'http://localhost:8000/home/subject/{subject_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Get Subject by ID", response)

# Update - Atualizar completamente um subject específico pelo ID
response = requests.put(f'http://localhost:8000/home/subject/{subject_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'name': 'Advanced Mathematics',
    'description': 'An advanced course on algebra, calculus, and more'
    # Adicione outros campos conforme necessário
})
print_response("Update Subject", response)

# Update - Atualizar parcialmente um subject específico pelo ID
response = requests.patch(f'http://localhost:8000/home/subject/{subject_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'description': 'An advanced course on algebra, calculus, geometry, and more'
    # Adicione outros campos conforme necessário
})
print_response("Partial Update Subject", response)

# Delete - Deletar um subject específico pelo ID
response = requests.delete(f'http://localhost:8000/home/subject/{subject_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Delete Subject", response)
