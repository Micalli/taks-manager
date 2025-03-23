import { Router } from "express";

import { listTasks } from "../modules/tasks/listTask";
import { createTask } from "../modules/tasks/createTask";
import { updateTask } from "../modules/tasks/updateTask";
import { updateTaskStatus } from "../modules/tasks/updateTaskStatus";
import { deleteTask } from "../modules/tasks/deleteTask";
import {
  validateSingInUp,
  validateTaskCreate,
  validateTaskId,
  validateTaskUpdate,
} from "../app/middleware/validateTaskBody";
import { authMiddleware } from "../app/middleware/auth/authMiddleware";
import { singin } from "../modules/auth/controllers/singIn";
import { singup } from "../modules/auth/controllers/singup";

export const router = Router();
router.post("/auth/singin",validateSingInUp , singin);
router.post("/auth/singup",validateSingInUp, singup);

router.use(authMiddleware);

router.get("/tasks", listTasks);

router.post("/tasks", validateTaskCreate, createTask);

router.put("/tasks/:taskId", validateTaskUpdate, updateTask);

router.put("/tasks/status/:taskId", validateTaskId, updateTaskStatus);

router.delete("/tasks/:taskId", validateTaskId, deleteTask);
