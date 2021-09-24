import { listContacts } from "./services/contacts_fetcher.js";

async function setInitialData() {
  const contacts = await listContacts();
  this.contacts = contacts;
  this.favorites = contacts.filter((contact) => contact.favorite);
}

function clear() {
  this.contacts = [];
  this.favorites = [];
  this.currentSection = "";
  this.currentContactId = null;
}

function getCurrentContact() {
  return this.contacts.find((contact) => contact.id === this.currentContactId);
}

function deleteContact(id) {
  console.log(this.contacts);
  this.contacts = this.contacts.filter((contact) => contact.id !== id);
  console.log(this.contacts);
}

const STORE = {
  contacts: [],
  favorites: [],
  currentSection: "",
  currentContactId: null,
  getCurrentContact,
  deleteContact,
  setInitialData,
  clear,
};

export default STORE;
