# Notes App

A simple notes application built with Django and Docker. This app allows users to create, manage, and delete notes, as well as upload audio files associated with each note. The application is designed to be run in a Docker environment for easy setup and deployment.

## Table of Contents

- [Notes App](#notes-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Setup Instructions](#setup-instructions)
  - [Usage](#usage)
    - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Create, retrieve, update, and delete notes.
- Upload and associate audio files with notes.
- User authentication with Django's built-in user model.
- Dockerized application for easy deployment.

## Technologies

- Django
- Django REST Framework
- PostgreSQL
- Docker
- React (Frontend)
- Docker Compose

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd noteapp
   ```

2. **Create a `.env` file:**

   Create a `.env` file in the root of your project directory with the following environment variables:

   ```plaintext
   POSTGRES_DB=your_db_name
   POSTGRES_USER=your_db_user
   POSTGRES_PASSWORD=your_db_password
   ```

3. **Build and run the application using Docker Compose:**

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the services defined in the `docker-compose.yml` file.

4. **Create a superuser:**

   If prompted during the startup, you can create a superuser by following the instructions in the console. You can also run the following command in the terminal to create a superuser:

   ```bash
   docker-compose exec web python manage.py createsuperuser
   ```

5. **Access the application:**

   - The Django backend will be available at `http://localhost:8000`.
   - The frontend (if using React) will be available at `http://localhost:3000`.

## Usage

Once the application is up and running, you can interact with the notes API using any REST client (like Postman) or directly from the frontend UI.

### API Endpoints

- **Notes:**

  - `GET /api/notes/`: Retrieve all notes for the authenticated user.
  - `POST /api/notes/`: Create a new note.
  - `GET /api/notes/{id}/`: Retrieve a specific note.
  - `PUT /api/notes/{id}/`: Update a specific note.
  - `DELETE /api/notes/{id}/`: Delete a specific note.

- **Audio:**
  - `POST /api/notes/{note_id}/audio/`: Upload audio for a specific note.
  - `GET /api/notes/{note_id}/audio/`: Retrieve all audio files associated with a specific note.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
