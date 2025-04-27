const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory array to store students
let students = [];
let nextId = 1;

// GET / - Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Students API!');
});

// GET /student - Get all students
app.get('/student', (req, res) => {
  res.json(students);
});

// GET /student/:id - Get a student by ID
app.get('/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// POST /student - Add a new student
app.post('/student', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Name is required');
  }
  const newStudent = { id: nextId++, name };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /student/:id - Update a student by ID
app.put('/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = name || student.name;
    res.json(student);
  } else {
    res.status(404).send('Student not found');
  }
});

// DELETE /student/:id - Delete a student by ID
app.delete('/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    res.send('Student deleted');
  } else {
    res.status(404).send('Student not found');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
