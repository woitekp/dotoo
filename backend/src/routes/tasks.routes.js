import { Router } from "express";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get("/", listTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
