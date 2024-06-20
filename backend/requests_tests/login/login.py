import requests
def test_login(email, password):   
    url = "http://127.0.0.1:8000/auth/token/login/"
    data = {
        "email": email,
        "password": password
    }
    response = requests.post(url, json=data)
    print(response.json())
    
if __name__ == '__main__':
    email = input("email: ")
    password = input("password: ")
    test_login(email,password)