docker-compose exec web python manage.py makemigrations notes
docker-compose exec web python manage.py migrate
