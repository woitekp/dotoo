import { Router } from "express";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import validate from "../middleware/validate.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", listTasks);
router.post("/", validate(createTaskSchema), createTask);
router.patch("/:id", validate(updateTaskSchema), updateTask);
router.delete("/:id", deleteTask);

export default router;
