import { request } from "./client";

export function registerUser(credentials) {
  return request("/auth/register", { method: "POST", body: credentials });
}

export function loginUser(credentials) {
  return request("/auth/login", { method: "POST", body: credentials });
}

export function logoutUser() {
  return request("/auth/logout", { method: "POST" });
}

export function fetchMe() {
  return request("/auth/me");
}
