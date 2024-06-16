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

# Create - Criar um novo content
response = requests.post('http://localhost:8000/home/content/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'title': 'Introduction to Calculus',
    'body': 'This content covers the basics of calculus including limits, derivatives, and integrals.',
    'subject': 1  # Substitua pelo ID do subject relacionado
    # Adicione outros campos conforme necessário
})
print_response("Create Content", response)

# Read - Listar todos os contents
response = requests.get('http://localhost:8000/home/content/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("List Contents", response)

# Read - Recuperar um content específico pelo ID
content_id = 1  # Substitua pelo ID do content que você deseja recuperar
response = requests.get(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Get Content by ID", response)

# Update - Atualizar completamente um content específico pelo ID
response = requests.put(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'title': 'Advanced Calculus',
    'body': 'This content covers advanced topics in calculus including multivariable calculus and differential equations.',
    'subject': 1  # Substitua pelo ID do subject relacionado
    # Adicione outros campos conforme necessário
})
print_response("Update Content", response)

# Update - Atualizar parcialmente um content específico pelo ID
response = requests.patch(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}',
    'Content-Type': 'application/json'
}, json={
    'body': 'This content covers advanced topics in calculus including multivariable calculus, differential equations, and series.'
    # Adicione outros campos conforme necessário
})
print_response("Partial Update Content", response)

# Delete - Deletar um content específico pelo ID
response = requests.delete(f'http://localhost:8000/home/content/{content_id}/', headers={
    'Authorization': f'Bearer {access_token}'
})
print_response("Delete Content", response)
