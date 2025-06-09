import { Router, RequestHandler } from "express";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.post("/tasks", createTask as RequestHandler);
router.get("/tasks", getAllTasks as RequestHandler);
router.patch("/tasks/:id", updateTask as RequestHandler);
router.delete("/tasks/:id", deleteTask as RequestHandler);

export default router;
