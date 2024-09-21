const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const userRouter = require("./routes/userRoutes")
const {createTables} = require('./db/db');
const authMiddleware = require('./authMiddleware/authMiddleware');

app.use(express.json());

createTables();

app.use("/api/task", authMiddleware, taskRouter);
app.use("/api/user", userRouter);

module.exports = app