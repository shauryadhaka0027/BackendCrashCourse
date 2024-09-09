// Import the Express module
const express = require('express');
const app = express();

// Define the port
const PORT = 3000;

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Express.js Server!');
});

// Route for the /about URL
app.get('/about', (req, res) => {
  res.send('This is a simple web server built using Express.js.');
});

// Route for the /contact URL
app.get('/contact', (req, res) => {
  res.json({
    email: 'student@example.com',
    phone: '123-456-7890'
  });
});

// Route for the /random URL
app.get('/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.send(`Random Number: ${randomNumber}`);
});

// Default route to handle undefined routes
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
