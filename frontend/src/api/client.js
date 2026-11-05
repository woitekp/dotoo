export async function request(path, { method = "GET", body } = {}) {
  const response = await fetch(`/api${path}`, {
    method,
    credentials: "include",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    ...(body && { body: JSON.stringify(body) }),
  });

  if (response.status === 204) return null;

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Something went wrong");
  }

  return data;
}
