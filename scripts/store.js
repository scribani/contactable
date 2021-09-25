import { listContacts } from "./services/contacts_fetcher.js";

async function setInitialData() {
  const contacts = await listContacts();
  this.contacts = contacts;
  this.updateFavorites();
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

function updateContact(updatedData) {
  this.contacts = this.contacts.map((contact) => {
    if (contact.id === this.currentContactId) {
      return Object.assign(contact, updatedData);
    }
    return contact;
  });
}

function deleteContact(id) {
  this.contacts = this.contacts.filter((contact) => contact.id !== id);
}

function updateFavorites() {
  this.favorites = this.contacts.filter((contact) => contact.favorite);
}

function addContact(newcontact) {
  this.contacts = [...this.contacts, newcontact];
}

const STORE = {
  contacts: [],
  favorites: [],
  currentSection: "",
  currentContactId: null,
  getCurrentContact,
  updateContact,
  addContact,
  deleteContact,
  updateFavorites,
  setInitialData,
  clear,
};

export default STORE;
