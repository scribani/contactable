import { listContacts } from "./services/contacts_fetcher.js";

async function setInitialData() {
  const contacts = await listContacts();
  this.contacts = contacts;
  this.favorites = contacts.filter((contact) => contact.favorite);
}

function clear() {
  this.contacts = [];
  this.favorites = [];
}

const STORE = {
  contacts: [],
  favorites: [],
  setInitialData,
  clear,
};

export default STORE;
