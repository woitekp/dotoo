import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  message: { error: "Too many attempts, try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});
