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
  const { title, content, dueDate } = req.body ?? {};

  if (!title?.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      content: content ?? "",
      ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      userId: req.userId,
    },
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

  const { title, content, isImportant, isDone, dueDate } = req.body ?? {};
  const data = {};

  if (title !== undefined) {
    if (!title.trim()) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    data.title = title.trim();
  }

  if (content !== undefined) data.content = content;
  if (isImportant !== undefined) data.isImportant = Boolean(isImportant);
  if (isDone !== undefined) data.isDone = Boolean(isDone);
  if (dueDate !== undefined) data.dueDate = new Date(dueDate);

  const task = await prisma.task.update({ where: { id }, data });

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
