import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import TodoRouter from "./routes/todo.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


app.use(morgan('combined', { stream: accessLogStream }));


app.use(morgan('dev'));

app.use(express.json());
app.use('/todo', TodoRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
