// Import required modules
const express = require('express');
const fs = require('fs');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

const dbPath = './db.json';

// Helper function to read the database file
const readDatabase = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// Helper function to write data to the database file
const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET all todos
app.get('/todos', (req, res) => {
  const db = readDatabase();
  res.json(db.todos);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const db = readDatabase();
  const newTodo = {
    id: db.todos.length + 1, // Generate a new ID based on the length of the array
    task: req.body.task,
    status: false
  };
  db.todos.push(newTodo);
  writeDatabase(db);
  res.status(201).json(newTodo);
});

// PUT to update status of todos with even IDs from false to true
app.put('/todos/even', (req, res) => {
  const db = readDatabase();
  let updated = false;

  db.todos.forEach((todo) => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
      updated = true;
    }
  });

  if (updated) {
    writeDatabase(db);
    res.json({ message: 'Updated even ID todos to true.' });
  } else {
    res.status(404).json({ message: 'No matching todos to update.' });
  }
});

// DELETE todos whose status is true
app.delete('/todos/completed', (req, res) => {
  let db = readDatabase();
  const initialLength = db.todos.length;

  // Filter out todos with status as true
  db.todos = db.todos.filter((todo) => todo.status !== true);

  if (db.todos.length < initialLength) {
    writeDatabase(db);
    res.json({ message: 'Deleted completed todos.' });
  } else {
    res.status(404).json({ message: 'No completed todos to delete.' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
