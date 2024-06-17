import requests

# Obtenção do token
response = requests.post('http://localhost:8000/login/api/token/', data={
    'username': 'dokasmn',
    'password': 'doka#123'
})
tokens = response.json()
access_token = tokens['access']

def print_response(title, response):
    print("="*30 + f" {title} " + "="*30)
    try:
        print(response.json())
    except Exception as e:
        print(f"Erro ao imprimir a resposta: {e}")
        print(response.text)

# Create - Criar um novo conteúdo (Content)
response = requests.post('http://localhost:8000/home/content/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'content_name': 'Introdução à História',
    'content_description': 'Este conteúdo introduz os principais conceitos da história mundial.',
    'content_subject': 1,  # Substitua pelo ID da matéria relacionada
    'content_professor_user': 1  # Substitua pelo ID do professor relacionado
})
print_response("Create Content", response)

# Read - Listar todos os conteúdos (Contents)
response = requests.get('http://localhost:8000/home/content/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("List Contents", response)

# Read - Recuperar um conteúdo específico pelo ID
content_id = 1  # Substitua pelo ID do conteúdo que você deseja recuperar
response = requests.get(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Get Content by ID", response)

# Update - Atualizar completamente um conteúdo específico pelo ID
response = requests.put(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'content_name': 'Introdução à Geografia',
    'content_description': 'Este conteúdo introduz os principais conceitos da geografia mundial.',
    'content_subject': 2,  # Substitua pelo novo ID da matéria relacionada
    'content_professor_user': 1  # Mantenha o mesmo ID do professor ou substitua conforme necessário
})
print_response("Update Content", response)

# Update - Atualizar parcialmente um conteúdo específico pelo ID
response = requests.patch(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'content_name': 'Introdução à Geografia Humana'
    # Adicione outros campos conforme necessário
})
print_response("Partial Update Content", response)

# Delete - Deletar um conteúdo específico pelo ID
response = requests.delete(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Delete Content", response)
