import { Router } from "express";
import { listTasks } from './app/useCases/tasks/listTask';
import { createTask,  } from './app/useCases/tasks/createTask';
import { updateTask } from './app/useCases/tasks/updateTask';
import { deleteTask } from './app/useCases/tasks/deleteTask';
import { updateTaskStatus } from './app/useCases/tasks/updateTaskStatus';
import { validateTaskCreate, validateTaskId, validateTaskUpdate } from './app/middleware/validateTaskBody';

 export const router = Router();

 router.get("/tasks", listTasks);

 router.post("/tasks", validateTaskCreate, createTask);

 router.put("/tasks/:taskId", validateTaskUpdate, updateTask);

 router.put("/tasks/status/:taskId", validateTaskId, updateTaskStatus);

 router.delete("/tasks/:taskId", validateTaskId, deleteTask);

