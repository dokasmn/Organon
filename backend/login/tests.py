from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from login.models import CustomUser

class UserCreationTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_create_user(self):
        url = '/auth/users/'
        data = {
            'email': 'test@example.com',
            'username': 'testuser',
            'password': 'testpassword',
            're_password': 'testpassword'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('email', response.data)
        self.assertEqual(response.data['email'], 'test@example.com')
        self.assertIn('username', response.data)
        self.assertEqual(response.data['username'], 'testuser')
        
        
class UserConfirmationTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email='confirm@example.com',
            username='confirmuser',
            password='testpassword'
        )
        self.user.generate_confirmation_code()

    def test_confirm_user(self):
        url = f'/auth/confirm-email/'
        data = {
            'email': 'confirm@example.com',
            'confirmation_code': self.user.confirmation_code
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)


class UserLoginTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email='login@example.com',
            username='loginuser',
            password='testpassword'
        )
        self.user.is_active = True
        self.user.save()

    def test_user_login(self):
        url = f'/auth/token/login/'
        data = {
            'email': 'login@example.com',
            'password': 'testpassword'
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)


