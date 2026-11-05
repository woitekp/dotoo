import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../db.js";
import {
  COOKIE_NAME,
  COOKIE_OPTIONS,
  COOKIE_MAX_AGE,
  TOKEN_LIFETIME,
} from "../session.js";

const SALT_ROUNDS = 10;

function publicUser(user) {
  return { id: user.id, login: user.login };
}

function startSession(res, user) {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: TOKEN_LIFETIME,
  });

  res.cookie(COOKIE_NAME, token, { ...COOKIE_OPTIONS, maxAge: COOKIE_MAX_AGE });
}

export async function register(req, res) {
  const { login, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { login } });

  if (existing) {
    return res.status(409).json({ error: "Login already taken" });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({ data: { login, passwordHash } });

  startSession(res, user);

  res.status(201).json({ user: publicUser(user) });
}

export async function login(req, res) {
  const { login, password } = req.body;

  const user = await prisma.user.findUnique({ where: { login } });

  const isValid = user && (await bcrypt.compare(password, user.passwordHash));

  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  startSession(res, user);

  res.json({ user: publicUser(user) });
}

export function logout(req, res) {
  res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

  res.status(204).end();
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });

  if (!user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  res.json({ user: publicUser(user) });
}
