# notes/tests.py
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User


class NoteTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")

    def test_create_note_authenticated(self):
        self.client.login(username="testuser", password="testpass")
        response = self.client.post(
            "/api/notes/", {"title": "Test Note", "description": "This is a test note."}
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
