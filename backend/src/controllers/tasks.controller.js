import prisma from "../db.js";

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) ? id : null;
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

  try {
    const task = await prisma.task.update({
      where: { id, userId: req.userId },
      data: req.body,
    });

    res.json({ task });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Task not found" });
    }

    throw error;
  }
}

export async function deleteTask(req, res) {
  const id = parseId(req.params.id);

  if (id === null) {
    return res.status(400).json({ error: "Invalid task id" });
  }

  const { count } = await prisma.task.deleteMany({
    where: { id, userId: req.userId },
  });

  if (count === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).end();
}
