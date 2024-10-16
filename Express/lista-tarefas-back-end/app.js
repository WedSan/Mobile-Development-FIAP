const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const userRouter = require("./routes/userRoutes")
const {createTables} = require('./db/db');
const authMiddleware = require('./middlewares/authMiddleware/authMiddleware');
const cors = require('cors')


app.use(cors());
app.use(express.json());

createTables();

app.use("/api/task", authMiddleware, taskRouter);
app.use("/api/user", userRouter);

module.exports = app