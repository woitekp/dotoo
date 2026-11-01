import { z } from "zod";

const taskFields = {
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be at most 200 characters"),
  content: z.string().max(200, "Content must be at most 200 characters"),
  isImportant: z.boolean(),
  isDone: z.boolean(),
  dueDate: z.coerce.date("Invalid due date"),
};

export const createTaskSchema = z.object({
  title: taskFields.title,
  content: taskFields.content.default(""),
  dueDate: taskFields.dueDate.optional(),
});

export const updateTaskSchema = z
  .object(taskFields)
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
