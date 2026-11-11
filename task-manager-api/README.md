# Task Manager API

A simple Task Manager built step by step while learning Node.js (Weeks 1-4):
Node.js basics, core HTTP server, Express.js and REST API design.
Data is stored in an **array** (no database), so it resets when the server restarts.

## Project Structure

```
task-manager-api/
├── part-a-cli/cli.js            # Part A: command-line tool
├── part-b-http-server/server.js # Part B: core http server
├── part-c-express-api/app.js    # Part C & D: Express REST API
├── package.json
└── README.md
```

## Installation

```bash
git clone <your-repo-link>
cd task-manager-api
npm install
```

## Part A - CLI Tool

```bash
node part-a-cli/cli.js "Buy milk"
node part-a-cli/cli.js "Finish homework" high
```

## Part B - Core HTTP Server

```bash
npm run http
```

| Method | Route    | Description       | Status |
|--------|----------|-------------------|--------|
| GET    | /        | Welcome message   | 200    |
| GET    | /tasks   | Get all tasks     | 200    |
| POST   | /tasks   | Add a task        | 201, 400 |
| GET    | /about   | App info          | 200    |
| ANY    | others   | Not found         | 404    |

## Part C - Express API

```bash
npm start
```

Server runs on `http://localhost:3000`

### Endpoints

| Method | Endpoint             | Description          | Success | Errors   |
|--------|----------------------|----------------------|---------|----------|
| GET    | /api/v1/tasks        | Get all tasks        | 200     | -        |
| GET    | /api/v1/tasks?completed=true | Filter tasks | 200     | -        |
| GET    | /api/v1/tasks/:id    | Get one task         | 200     | 400, 404 |
| POST   | /api/v1/tasks        | Create a task        | 201     | 400      |
| PUT    | /api/v1/tasks/:id    | Update a task        | 200     | 400, 404 |
| DELETE | /api/v1/tasks/:id    | Delete a task        | 200     | 400, 404 |

### Task Object

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "description": "Finish week 1",
  "completed": false
}
```

### Examples

**POST /api/v1/tasks**

Request body:
```json
{ "title": "Buy milk", "description": "2 litres" }
```
Response `201 Created`:
```json
{ "id": 3, "title": "Buy milk", "description": "2 litres", "completed": false }
```

**PUT /api/v1/tasks/3**

Request body:
```json
{ "completed": true }
```
Response `200 OK`:
```json
{ "id": 3, "title": "Buy milk", "description": "2 litres", "completed": true }
```

**DELETE /api/v1/tasks/3**

Response `200 OK`:
```json
{ "message": "Task deleted", "task": { "id": 3, "title": "Buy milk", "description": "2 litres", "completed": true } }
```

**Error responses**

`400 Bad Request` (missing title):
```json
{ "error": "title is required" }
```

`404 Not Found` (wrong id):
```json
{ "error": "Task not found" }
```

## Status Codes Used

| Code | Meaning      | When                                   |
|------|--------------|----------------------------------------|
| 200  | OK           | Successful GET, PUT, DELETE            |
| 201  | Created      | Successful POST                        |
| 400  | Bad Request  | Missing/invalid title, id not a number |
| 404  | Not Found    | Task id or route does not exist        |

## Author

Your Name
