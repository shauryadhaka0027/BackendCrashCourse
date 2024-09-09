const express = require('express');
const todoRouter = express.Router();
const fs = require('fs');
const dbPath = './db.json';

// Helper function to read the database
const readDatabase = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// GET all todos
todoRouter.get('/', (req, res) => {
  const db = readDatabase();
  res.json(db.todos);
});

// GET a specific todo by ID
todoRouter.get('/:id', (req, res) => {
  const db = readDatabase();
  const todo = db.todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// POST to create a new todo
todoRouter.post('/', (req, res) => {
  const db = readDatabase();
  const newTodo = {
    id: db.todos.length + 1,
    task: req.body.task,
    completed: false
  };
  db.todos.push(newTodo);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  res.status(201).json(newTodo);
});

// PUT to update a todo by ID
todoRouter.put('/:id', (req, res) => {
  const db = readDatabase();
  const todo = db.todos.find(t => t.id === parseInt(req.params.id));
  if (todo) {
    todo.task = req.body.task || todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// DELETE a todo by ID
todoRouter.delete('/:id', (req, res) => {
  let db = readDatabase();
  const todoIndex = db.todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex !== -1) {
    db.todos.splice(todoIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

module.exports = todoRouter;
