import { httpClient } from "../lib/axios";

export async function signup(data) {
  const res = await httpClient.post("/auth/signup", data);
  return res.data;
}

export async function login(data) {
  const res = await httpClient.post("/auth/login", data);
  return res.data;
}

export async function fetchCurrentUser() {
  try {
    const res = await httpClient.get("/auth/me");
    return res.data.user;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  const res = await httpClient.post("/auth/logout");
  return res.data;
}
