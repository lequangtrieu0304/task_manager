const express = require('express');
const router = express.Router();

const taskControllers = require('../controllers/taskControllers');

router.get('/', taskControllers.getAllTasks);

router.get('/:id', taskControllers.getTaskById);

router.post('/find-task', taskControllers.findTask)

router.post('/', taskControllers.addTask);

router.post('/edit-task/:id', taskControllers.editTask)

router.get('/delete/:id', taskControllers.deleteTask)

module.exports = router;