# TodoApp API

## Description
A simple Node.js and Express API for managing tasks with user authentication using JWT and MongoDB.

## Features
- User Authentication (JWT)
- Task CRUD Operations
- Protected Routes

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

## Endpoints

### Authentication

- **POST /login**
  - **Request Body:**
    ```json
    {
      "username": "admin",
      "password": "password"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "jwt_token"
    }
    ```

- **POST /register**
  - **Request Body:**
    ```json
    {
      "username": "newuser",
      "password": "newpassword"
    }
    ```
  - **Response:** `201 Created`

### Tasks

- **GET /tasks**
  - **Header:** `Authorization: Bearer jwt_token`
  - **Response:**
    ```json
    [
      {
        "_id": "task_id",
        "title": "Task Title",
        "description": "Task Description"
      }
    ]
    ```

- **POST /tasks**
  - **Header:** `Authorization: Bearer jwt_token`
  - **Request Body:**
    ```json
    {
      "title": "New Task",
      "description": "Task Description"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "task_id",
      "title": "New Task",
      "description": "Task Description"
    }
    ```

- **GET /tasks/:id**
  - **Header:** `Authorization: Bearer jwt_token`
  - **Response:**
    ```json
    {
      "_id": "task_id",
      "title": "Task Title",
      "description": "Task Description"
    }
    ```

- **PUT /tasks/:id**
  - **Header:** `Authorization: Bearer jwt_token`
  - **Request Body:**
    ```json
    {
      "title": "Updated Task Title",
      "description": "Updated Task Description"
    }
    ```
  - **Response:**
    ```json
    {
      "_id": "task_id",
      "title": "Updated Task Title",
      "description": "Updated Task Description"
    }
    ```

- **DELETE /tasks/:id**
  - **Header:** `Authorization: Bearer jwt_token`
  - **Response:** `200 OK`

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kennedykjj/to-do-list.git
   cd to-do-list
