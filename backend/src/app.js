import express, { Router } from "express";
import authRouter from "./routes/auth.routes.js";
import taskRouter from "./routes/tasks.routes.js";

const app = express();

app.use(express.json());

const api = Router();

app.use("/api", api);

api.use("/auth", authRouter);

api.use("/tasks", taskRouter);

api.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
