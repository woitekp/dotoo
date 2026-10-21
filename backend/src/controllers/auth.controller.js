import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db.js";

const SALT_ROUNDS = 10;
const TOKEN_LIFETIME = "7d";

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_LIFETIME,
  });
}

function publicUser(user) {
  return { id: user.id, login: user.login };
}

export async function register(req, res) {
  const { login, password } = req.body ?? {};

  if (!login?.trim() || !password) {
    return res.status(400).json({ error: "Login and password are required" });
  }

  const existing = await prisma.user.findUnique({
    where: { login: login.trim() },
  });

  if (existing) {
    return res.status(409).json({ error: "Login already taken" });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { login: login.trim(), passwordHash },
  });

  res.status(201).json({ token: createToken(user.id), user: publicUser(user) });
}

export async function login(req, res) {
  const { login, password } = req.body ?? {};

  if (!login?.trim() || !password) {
    return res.status(400).json({ error: "Login and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { login: login.trim() } });

  const isValid = user && (await bcrypt.compare(password, user.passwordHash));

  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ token: createToken(user.id), user: publicUser(user) });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  res.json({ user: publicUser(user) });
}
