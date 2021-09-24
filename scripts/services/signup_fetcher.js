import { apiFetch } from "./api_fetch.js";

export const signup = (email, password) =>
  apiFetch(
    "signup",
    "POST",
    {
      "Content-Type": "application/json",
    },
    { email, password }
  );