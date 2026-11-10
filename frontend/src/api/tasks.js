import { request } from "./client";

export function fetchTasks() {
  return request("/tasks");
}

export function createTask(task) {
  return request("/tasks", { method: "POST", body: task });
}

export function updateTask(id, changes) {
  return request(`/tasks/${id}`, { method: "PATCH", body: changes });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}
