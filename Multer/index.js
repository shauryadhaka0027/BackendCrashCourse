import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const app = express();

// Define the uploads directory path
const uploadsDir = './uploads';

// Check if the uploads folder exists, if not, create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create the folder recursively if it doesn't exist
}

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); 
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 } 
}).single('Image'); 

app.post('/profile', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err.message);
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        res.send(`File uploaded successfully: ${req.file.originalname}`);
    });
});


app.listen(4000, () => {
    console.log("Server is running on port 3000");
});
