import { Router } from "express";
import { register, login, logout, me } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import validate from "../middleware/validate.js";
import requireAuth from "../middleware/requireAuth.js";
import { authLimiter } from "../middleware/rateLimit.js";

const router = Router();

router.post("/register", authLimiter, validate(registerSchema), register);
router.post("/login", authLimiter, validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
