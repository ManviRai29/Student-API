# Student API

A simple REST API built with **Node.js** and **Express.js** for managing student information. This project demonstrates basic CRUD operations and REST API concepts.

## Features

* Add new student details
* View all student records
* View a specific student
* Update student information
* Delete student records
* Email validation
* RESTful API endpoints
* Easy to test using Postman

## Technologies Used

* **Node.js**
* **Express.js**
* **JavaScript**
* **REST API**
* **Postman**

## Project Structure

```text
Student-API/
│
├── server.js
├── README.md
└── screenshots/
```

## API Operations

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/students`     | Add a new student      |
| GET    | `/students`     | Get all students       |
| GET    | `/students/:id` | Get a student by ID    |
| PUT    | `/students/:id` | Update student details |
| DELETE | `/students/:id` | Delete a student       |

## Student Data

A student record can contain details such as:

```json
{
  "name": "Manvi",
  "email": "manvi@example.com",
  "age": 20
}
```

## How to Run

### 1. Clone the repository

```bash
git clone https://github.com/ManviRai29/Student-API.git
```

### 2. Open the project folder

```bash
cd Student-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node server.js
```

The API will run on the port configured in `server.js`.

## Testing the API

You can use **Postman** to test the API endpoints.

For example:

* Send a `POST` request to add a student.
* Send a `GET` request to view students.
* Send a `PUT` request to update a student.
* Send a `DELETE` request to remove a student.

Screenshots of the API testing can be added to the `screenshots/` folder.

## Purpose of the Project

This project was created to practice building REST APIs with Node.js and Express.js and to understand how CRUD operations work in a backend application.

## Author

**Manvi Rai**

GitHub: [ManviRai29](https://github.com/ManviRai29)

