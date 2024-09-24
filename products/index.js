import express from 'express';
import connection from './db/db.js';
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
const port = process.env.PORT ||4000;
const app = express();

app.use(express.json());
app.use("/",userRouter);
app.use("/",productRouter);
app.listen(port,async()=>{
    await connection
    console.log(`Server is running on port ${port}`);
});