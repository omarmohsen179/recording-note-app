# accounts/management/commands/create_root_user.py
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class Command(BaseCommand):
    help = "Create a root user if not exists and return the token"

    def handle(self, *args, **options):
        username = "root"
        password = "root"  # Set a secure password here

        # Check if the user already exists
        user, created = User.objects.get_or_create(
            username=username, defaults={"password": password}
        )

        # If the user was created, set their password
        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f"Created new user: {username}"))

        # Generate token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        # Output the tokens
        self.stdout.write(self.style.SUCCESS(f"Access Token: {access_token}"))
        self.stdout.write(self.style.SUCCESS(f"Refresh Token: {refresh_token}"))
