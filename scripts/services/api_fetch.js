import { BASE_URL } from "../constants.js";

export const apiFetch = async (endpoint, method = "GET", headers, body) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const error = await response.statusText;
    throw new Error(error);
  }
  if (response.status === 204) return response.statusText;
  return await response.json();
};
