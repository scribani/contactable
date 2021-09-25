import { apiFetch } from "./api_fetch.js";

export const login = (email, password) =>
  apiFetch(
    "login",
    "POST",
    {
      "Content-Type": "application/json",
    },
    { email, password }
  );

export const logout = () =>
  apiFetch("logout", "DELETE", {
    Authorization: `Token token=${sessionStorage.getItem("token")}`,
  });

