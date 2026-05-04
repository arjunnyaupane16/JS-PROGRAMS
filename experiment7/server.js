// Experiment 7: Server-side Application using Node.js and Express
// RESTful API with CRUD operations

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// In-memory data store (simulating a database)
let students = [
  { id: 1, name: 'Arjun Nyaupane', age: 22, course: 'Computer Science' },
  { id: 2, name: 'Sita Sharma', age: 21, course: 'Information Technology' },
  { id: 3, name: 'Ram Thapa', age: 23, course: 'Software Engineering' }
];

let nextId = 4;

// ============================================
// ROUTES
// ============================================

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Student Management API',
    version: '1.0.0',
    endpoints: {
      'GET /': 'API information',
      'GET /api/students': 'Get all students',
      'GET /api/students/:id': 'Get student by ID',
      'POST /api/students': 'Create new student',
      'PUT /api/students/:id': 'Update student by ID',
      'DELETE /api/students/:id': 'Delete student by ID',
      'GET /api/stats': 'Get statistics'
    }
  });
});

// ============================================
// CRUD OPERATIONS
// ============================================

// CREATE - Add new student
app.post('/api/students', (req, res) => {
  const { name, age, course } = req.body;

  // Validation
  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, age, and course'
    });
  }

  const newStudent = {
    id: nextId++,
    name,
    age: parseInt(age),
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully',
    data: newStudent
  });
});

// READ - Get all students
app.get('/api/students', (req, res) => {
  // Query parameters for filtering
  const { course, minAge, maxAge } = req.query;

  let filteredStudents = [...students];

  if (course) {
    filteredStudents = filteredStudents.filter(s =>
      s.course.toLowerCase().includes(course.toLowerCase())
    );
  }

  if (minAge) {
    filteredStudents = filteredStudents.filter(s => s.age >= parseInt(minAge));
  }

  if (maxAge) {
    filteredStudents = filteredStudents.filter(s => s.age <= parseInt(maxAge));
  }

  res.json({
    success: true,
    count: filteredStudents.length,
    data: filteredStudents
  });
});

// READ - Get student by ID
app.get('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }

  res.json({
    success: true,
    data: student
  });
});

// UPDATE - Update student by ID
app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }

  const { name, age, course } = req.body;

  // Update only provided fields
  if (name) students[studentIndex].name = name;
  if (age) students[studentIndex].age = parseInt(age);
  if (course) students[studentIndex].course = course;

  res.json({
    success: true,
    message: 'Student updated successfully',
    data: students[studentIndex]
  });
});

// DELETE - Delete student by ID
app.delete('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found`
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.json({
    success: true,
    message: 'Student deleted successfully',
    data: deletedStudent
  });
});

// ============================================
// ADDITIONAL ROUTES
// ============================================

// Get statistics
app.get('/api/stats', (req, res) => {
  const totalStudents = students.length;
  const averageAge = students.reduce((sum, s) => sum + s.age, 0) / totalStudents;

  const courseCount = students.reduce((acc, s) => {
    acc[s.course] = (acc[s.course] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      totalStudents,
      averageAge: averageAge.toFixed(2),
      courseDistribution: courseCount
    }
  });
});

// Search students
app.get('/api/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false,
      message: 'Please provide search query parameter "q"'
    });
  }

  const results = students.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.course.toLowerCase().includes(q.toLowerCase())
  );

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('Experiment 7: Node.js + Express RESTful API Server');
  console.log('='.repeat(60));
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET    http://localhost:${PORT}/`);
  console.log(`  GET    http://localhost:${PORT}/api/students`);
  console.log(`  GET    http://localhost:${PORT}/api/students/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/students`);
  console.log(`  PUT    http://localhost:${PORT}/api/students/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/students/:id`);
  console.log(`  GET    http://localhost:${PORT}/api/stats`);
  console.log(`  GET    http://localhost:${PORT}/api/search?q=query`);
  console.log('\nPress Ctrl+C to stop the server');
  console.log('='.repeat(60));
});
