
import express from 'express';
import connection from './db/db.js';
const port = process.env.PORT ||3000
import movieRouter from "./routes/movie.js"

const app = express();
app.use(express.json());

app.use("/",movieRouter)




app.listen(port,async()=>{
    await connection
    console.log(`Server is running on port ${port}`);
})