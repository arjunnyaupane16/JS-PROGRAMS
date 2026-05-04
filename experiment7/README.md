# Experiment 7: Node.js + Express RESTful API

This experiment demonstrates building a server-side application using Node.js and Express framework with RESTful API endpoints.

## Setup Instructions

1. Install dependencies:
   ```bash
   cd experiment7
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. The server will run on: http://localhost:3000

## API Endpoints

### Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API information |
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/stats` | Get statistics |
| GET | `/api/search?q=query` | Search students |

## Testing the API

### Option 1: Using the Test Script

Run the automated test script:
```bash
node test-api.js
```

### Option 2: Using Browser

Open your browser and visit:
- http://localhost:3000
- http://localhost:3000/api/students
- http://localhost:3000/api/stats

### Option 3: Using cURL

```bash
# Get all students
curl http://localhost:3000/api/students

# Get student by ID
curl http://localhost:3000/api/students/1

# Create new student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","age":22,"course":"Computer Science"}'

# Update student
curl -X PUT http://localhost:3000/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"age":23}'

# Delete student
curl -X DELETE http://localhost:3000/api/students/1

# Search students
curl "http://localhost:3000/api/search?q=Science"

# Get statistics
curl http://localhost:3000/api/stats
```

### Option 4: Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import the endpoints listed above
3. Test each endpoint with different parameters

## Query Parameters

### GET /api/students

Filter students by:
- `course` - Filter by course name
- `minAge` - Minimum age
- `maxAge` - Maximum age

Examples:
```
/api/students?course=Computer
/api/students?minAge=21&maxAge=23
/api/students?course=Science&minAge=20
```

## Request Body Examples

### POST /api/students
```json
{
  "name": "John Doe",
  "age": 22,
  "course": "Computer Science"
}
```

### PUT /api/students/:id
```json
{
  "name": "John Updated",
  "age": 23,
  "course": "Software Engineering"
}
```

## Features

- ✅ RESTful API design
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Request validation
- ✅ Error handling
- ✅ Query parameters for filtering
- ✅ Search functionality
- ✅ Statistics endpoint
- ✅ JSON responses
- ✅ Logging middleware

## Development Mode

For auto-restart on file changes, install nodemon:
```bash
npm install -g nodemon
npm run dev
```
