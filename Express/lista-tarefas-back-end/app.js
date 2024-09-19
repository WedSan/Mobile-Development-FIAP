const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const userRouter = require("./routes/userRoutes")
const {createTables} = require('./db/db')

app.use(express.json());

createTables();

app.use("/api/task", taskRouter);
app.use("/api/user", userRouter);

module.exports = app