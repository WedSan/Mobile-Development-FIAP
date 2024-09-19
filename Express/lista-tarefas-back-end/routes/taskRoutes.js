const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get("/task", taskController.getAllTasks);
router.get("/task/:id", taskController.getTaskById);
router.post("/task", taskController.createTask);
router.put("/task/:id", taskController.updateTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;