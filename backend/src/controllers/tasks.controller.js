import prisma from "../db.js";

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) ? id : null;
}

async function findUserTask(id, userId) {
  return prisma.task.findFirst({ where: { id, userId } });
}

export async function listTasks(req, res) {
  const tasks = await prisma.task.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "asc" },
  });

  res.json({ tasks });
}

export async function createTask(req, res) {
  const task = await prisma.task.create({
    data: { ...req.body, userId: req.userId },
  });

  res.status(201).json({ task });
}

export async function updateTask(req, res) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const existing = await findUserTask(id, req.userId);

  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  const task = await prisma.task.update({ where: { id }, data: req.body });

  res.json({ task });
}

export async function deleteTask(req, res) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const existing = await findUserTask(id, req.userId);

  if (!existing) {
    return res.status(404).json({ error: "Task not found" });
  }

  await prisma.task.delete({ where: { id } });

  res.status(204).end();
}
