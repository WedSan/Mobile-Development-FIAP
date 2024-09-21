const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();
const onlyAdminMiddleware = require('../middlewares/adminOnlyMiddleware');

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.put("/:id", onlyAdminMiddleware, taskController.updateTask);
router.delete("/:id", onlyAdminMiddleware, taskController.deleteTask);

module.exports = router;