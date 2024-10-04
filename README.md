
# Password Manager Application

This repository contains the Docker images and configuration files for a password manager application built with **React** for the frontend and **Node.js** with **Express** for the backend. The backend communicates with a **MongoDB** database to manage user credentials securely.

## Features

- **Frontend**: A responsive and user-friendly interface built with React.
- **Backend**: Provides a RESTful API to manage credentials.
- **MongoDB Integration**: Uses MongoDB for data storage.
- **Secure Communication**: Ensures secure communication between frontend and backend.

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine.
- **Docker Compose**: Ensure Docker Compose is installed on your machine.

## Installing Docker and Docker Compose on Windows

### Download Docker Desktop:

1. Visit the Docker Desktop for Windows page.
2. Download and install Docker Desktop.

### Install Docker Desktop:

1. Run the Docker Desktop installer.
2. Follow the installation instructions.
3. After installation, Docker Desktop will start automatically.

### Verify Installation:

Open a terminal (Command Prompt or PowerShell) and run the following commands to verify the installation:

```bash
docker --version
docker-compose --version
```

## How to Run

### Using Docker Compose

The easiest way to run the entire application is by using Docker Compose. Follow the steps below:

1. Clone the Repository:
```bash
git clone https://github.com/Denyme24/Password-Manager.git
cd Password-Manager
```

2. Create a `.env` File in the Root Directory:

Create a `.env` file in the root directory with the following content:
```bash
NODE_ENV=development
REACT_APP_BACKEND_URL=http://localhost:3000
```

3. Create a `.env` File in the Backend Directory:

Navigate to the backend directory and create a `.env` file with the following content:
```bash
MONGO_URI=mongodb://localhost:27017
```

4. Run Docker Compose:
```bash
docker-compose up --build
```

### Access the Application:

- **Frontend**: Open your browser and navigate to `http://localhost:5173`
- **Backend**: The backend server will be running on `http://localhost:3000`

### Pulling and Running Individual Docker Containers

If you prefer to run the frontend and backend containers individually, follow these steps:

#### Backend

1. Pull the Backend Docker Image:
```bash
docker pull denyme24/password-manager-backend:latest
```

2. Run the Backend Docker Container:
```bash
docker run -p 3000:3000 --name password-manager-backend --env MONGO_URI=mongodb://localhost:27017 denyme24/password-manager-backend:latest
```

#### Frontend

1. Pull the Frontend Docker Image:
```bash
docker pull denyme24/password-manager-frontend:latest
```

2. Run the Frontend Docker Container:
```bash
docker run -p 5173:5173 --name password-manager-frontend denyme24/password-manager-frontend:latest
```

## Using the `docker-compose.yml` File

The `docker-compose.yml` file is included in this repository and defines the services for the frontend, backend, and MongoDB. Here is the content of the `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:4.4.6
    container_name: password-manager-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    image: denyme24/password-manager-backend:latest
    container_name: password-manager-backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://password-manager-mongodb:27017/CipherNest
    depends_on:
      - mongodb

  frontend:
    image: denyme24/password-manager-frontend:latest
    container_name: password-manager-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    environment:
      - REACT_APP_BACKEND_URL=http://password-manager-backend:3000

volumes:
  mongo-data:
```

## MongoDB Setup in Backend

The backend service requires a MongoDB instance to store and retrieve credentials. The MongoDB URI should be provided via the `MONGO_URI` environment variable. In the Docker Compose setup, MongoDB is configured as a service, and the backend connects to it using the service name `password-manager-mongodb`.

If you are running MongoDB locally, ensure it is running on `localhost:27017` and update the `MONGO_URI` environment variable accordingly.

## Additional Information

For more information on how to set up and run the backend and frontend applications individually, please refer to their respective directories and documentation.

## Contact

For any questions or issues, please contact [rajnaman488@gmail.com](mailto:rajnaman488@gmail.com).
