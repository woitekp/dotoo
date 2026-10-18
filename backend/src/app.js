import express, { Router } from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

const api = Router();

app.use("/api", api);

api.use("/auth", authRoutes);

api.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
