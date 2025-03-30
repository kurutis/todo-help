import { authenticateToken } from "../middleware/authToken.js";
import { Router } from "express";
import { addNewOneTask, updateTask, deleteTask, getTasks } from "../controllers/tasksController.js";

export let router = Router()

router.route('/')
    .all(authenticateToken)
    .get(getTasks)
    .post(addNewOneTask)
router.route('/:id')
    .all(authenticateToken)
    .put(updateTask)
    .delete(deleteTask)