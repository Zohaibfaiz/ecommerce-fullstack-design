import { apiFetch, clearAuthSession, setAuthSession } from "./http";

export async function login(email, password) {
  const data = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  setAuthSession(data.token, data.user);
  return data;
}

export async function register(name, email, password) {
  const data = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  setAuthSession(data.token, data.user);
  return data;
}

export async function fetchMe() {
  const data = await apiFetch("/auth/me");
  return data.user;
}

export function logout() {
  clearAuthSession();
}
