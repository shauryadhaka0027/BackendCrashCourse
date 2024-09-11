import express from 'express';
const router=express.Router()
import fs from 'fs';
const dbPath = './db.json';

const readDatabase = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
  };
router.get('/',async(req,res)=>{
    const db = readDatabase();
  res.json(db.todos);
})

router.get('/:id', (req, res) => {
    const db = readDatabase();
    const todo = db.todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  });
  
  // POST to create a new todo
  router.post('/', (req, res) => {
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
  router.put('/:id', (req, res) => {
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
  router.delete('/:id', (req, res) => {
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
  
 
  

export default router;