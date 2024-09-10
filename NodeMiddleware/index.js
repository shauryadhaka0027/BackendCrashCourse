const express = require('express');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Validation middleware
function validateRequestBody(req, res, next) {
    const { ID, Name, Rating, Description, Genre, Cast } = req.body;

    // Validate data types
    if (typeof ID !== 'number') {
        return res.status(400).json({ error: 'ID must be a number' });
    }
    if (typeof Name !== 'string') {
        return res.status(400).json({ error: 'Name must be a string' });
    }
    if (typeof Rating !== 'number') {
        return res.status(400).json({ error: 'Rating must be a number' });
    }
    if (typeof Description !== 'string') {
        return res.status(400).json({ error: 'Description must be a string' });
    }
    if (typeof Genre !== 'string') {
        return res.status(400).json({ error: 'Genre must be a string' });
    }
    if (!Array.isArray(Cast) || !Cast.every(c => typeof c === 'string')) {
        return res.status(400).json({ error: 'Cast must be an array of strings' });
    }

    // If all checks pass, proceed to the next middleware/route handler
    next();
}

// POST route to handle the incoming requests
app.post('/', validateRequestBody, (req, res) => {
    // Simulate saving the TODO item
    res.status(201).json({ message: 'TODO item successfully created', data: req.body });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
