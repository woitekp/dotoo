import { z } from "zod";

// The message on the type covers a missing field; the one on min covers a
// value that is present but too short.
const taskFields = {
  title: z
    .string({ error: "Title is required" })
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be at most 200 characters"),
  content: z
    .string({ error: "Content must be text" })
    .max(200, "Content must be at most 200 characters"),
  isImportant: z.boolean({ error: "isImportant must be true or false" }),
  isDone: z.boolean({ error: "isDone must be true or false" }),
  dueDate: z.coerce.date({ error: "Invalid due date" }),
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
