import { Router } from "express";
import { listTasks } from './app/useCases/tasks/listTask';
export const router = Router();
router.get('/tasks', listTasks);
