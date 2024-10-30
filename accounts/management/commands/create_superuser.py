from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


class Command(BaseCommand):
    help = "Create a superuser if not exists and return the JWT token"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        superuser_username = "admin"  # Set your desired superuser username
        superuser_email = "admin@example.com"  # Set your desired superuser email
        superuser_password = "superpassword"  # Set your desired superuser password

        # Check if the superuser already exists
        if not User.objects.filter(username=superuser_username).exists():
            user = User.objects.create_superuser(
                username=superuser_username,
                email=superuser_email,
                password=superuser_password,
            )
            self.stdout.write(
                self.style.SUCCESS(f"Superuser {superuser_username} created.")
            )
        else:
            user = User.objects.get(username=superuser_username)
            self.stdout.write(
                self.style.SUCCESS(f"Superuser {superuser_username} already exists.")
            )

        # Generate JWT token for the superuser
        refresh = RefreshToken.for_user(user)
        self.stdout.write(
            self.style.SUCCESS(
                f"Access Token  Super Admin: {str(refresh.access_token)}"
            )
        )
        self.stdout.write(
            self.style.SUCCESS(f"Refresh Token Super Admin: {str(refresh)}")
        )
