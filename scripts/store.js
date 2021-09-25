import { CONTACTABLE, LOGIN } from "./constants.js";
import { listContacts } from "./services/contacts_fetcher.js";

async function setInitialData() {
  try {
    const contacts = await listContacts();
    this.contacts = contacts;
    this.updateFavorites();
    this.currentSection = CONTACTABLE;
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

function clear() {
  this.contacts = [];
  this.favorites = [];
  this.currentSection = LOGIN;
  this.currentContactId = null;
}

function getCurrentContact() {
  return this.contacts.find((contact) => contact.id === this.currentContactId);
}

function updateContact(updatedData) {
  const contacts = this.contacts.map((contact) => {
    if (contact.id === this.currentContactId) {
      return Object.assign(contact, updatedData);
    }
    return contact;
  });
  this.contacts = sortContacts(contacts);
}

function deleteContact(id) {
  this.contacts = this.contacts.filter((contact) => contact.id !== id);
}

function updateFavorites() {
  this.favorites = this.contacts.filter((contact) => contact.favorite);
}

function addContact(newcontact) {
  this.contacts = sortContacts([...this.contacts, newcontact]);
}

function sortContacts(contacts) {
  return contacts.sort((a, b) => a.name > b.name);
}

const STORE = {
  contacts: [],
  favorites: [],
  currentSection: LOGIN,
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
