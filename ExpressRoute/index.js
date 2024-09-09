const express = require('express');
const app = express();

const userRouter=require("./routes/users")
const todoRouter=require('./routes/todo')

app.use(express.json());


app.use('/users',userRouter)
app.use('/todo', todoRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
