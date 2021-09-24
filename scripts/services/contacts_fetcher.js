import { apiFetch } from "./api_fetch.js";

export const listContacts = () =>
  apiFetch("contacts", "GET", {
    Authorization: `Token token=${sessionStorage.getItem("token")}`,
  });

export const showContact = (id) =>
  apiFetch(`contacts/${id}`, "GET", {
    Authorization: `Token token=${sessionStorage.getItem("token")}`,
  });

export const createContact = (newContact) =>
  apiFetch(
    "contacts",
    "POST",
    {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`,
    },
    newContact
  );

export const editContact = (id, updatedContact) =>
  apiFetch(
    `contacts/${id}`,
    "PATCH",
    {
      "Content-Type": "application/json",
      Authorization: `Token token=${sessionStorage.getItem("token")}`,
    },
    updatedContact
  );

export const deleteContact = (id) =>
  apiFetch(`contacts/${id}`, "DELETE", {
    Authorization: `Token token=${sessionStorage.getItem("token")}`,
  });
