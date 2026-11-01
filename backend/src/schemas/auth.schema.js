import { z } from "zod";

export const registerSchema = z.object({
  login: z
    .string()
    .trim()
    .min(3, "Login must be at least 3 characters")
    .max(32, "Login must be at most 32 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(200, "Password must be at most 200 characters"),
});

export const loginSchema = z.object({
  login: z.string().trim().min(1, "Login is required"),
  password: z.string().min(1, "Password is required"),
});
