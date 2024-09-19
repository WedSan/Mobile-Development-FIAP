const express = require('express');
const app = express();
const taskRouter = require('./routes/taskRoutes');
const {createTables} = require('./db/db')

app.use(express.json());

createTables();

app.use("/api", taskRouter);

module.exports = app