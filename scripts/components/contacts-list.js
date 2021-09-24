import { CONTACT_DETAILS, CREATE_CONTACT } from "../constants.js";
import DOMHandler from "../dom_handler.js";
import Main from "../pages/main.js";
import { editContact } from "../services/contacts_fetcher.js";
import STORE from "../store.js";

function contactTemplate(contact) {
  return `
  <div class="contact-item-container" data-id="${contact.id}">
    <img src="../assets/images/Rectangle.png" class="list-item-avatar" />
    <p>${contact.name}</p>
    <img src="../assets/images/star-${
      contact.favorite ? "favorite" : "default"
    }.svg" class="star"/>
  </div>
  `;
}

function generateFavoritesTemplate(favorites) {
  const favoriteContacts = favorites
    .map((contact) => contactTemplate(contact))
    .join("");
  return `
    <h6 class="label-list">FAVORITES</h6>
    ${favoriteContacts}
    `;
}

function onContactDetail(e) {
  const parent = e.target.closest(".contact-item-container");
  const star = e.target.classList.contains("star");
  if (star) return;

  if (parent) {
    STORE.currentContactId = parseInt(parent.dataset.id);
    STORE.currentSection = CONTACT_DETAILS;
    DOMHandler.render(Main);
  }
}

async function onFavorite(e) {
  const parent = e.target.closest(".contact-item-container");
  const star = e.target.classList.contains("star");
  if (star) {
    STORE.currentContactId = parseInt(parent.dataset.id);
    const favoriteStatus = STORE.getCurrentContact().favorite;
    const updatedData = { favorite: !favoriteStatus };
    await editContact(STORE.currentContactId, updatedData);
    STORE.updateContact(updatedData);
    STORE.updateFavorites();
    DOMHandler.render(Main);
  }
}

function onCreate(e) {
  STORE.currentSection = CREATE_CONTACT;
  DOMHandler.render(Main);
}

const ContactsList = () => {
  return {
    title: "<h2 class='main-header'>Contactable</h2>",
    toString: function () {
      const contacts = STORE.contacts;
      const favorites = STORE.favorites;
      return `
      <section class="section list-contact-section">
        <div class="js-contacts height-115">
          ${favorites.length > 0 ? generateFavoritesTemplate(favorites) : ""}
          <h6 class="label-list">CONTACTS (${contacts.length})</h6>
          ${contacts.map((contact) => contactTemplate(contact)).join("")}
        </div>
        <div class="js-create newcontact-button">
          <img src="../assets/images/Union.svg" class="add-svg" >
        </div>
      </section>
      `;
    },
    addEventListeners: function () {
      const container = document.querySelector(".js-contacts");
      const createBtn = document.querySelector(".js-create");

      container.addEventListener("click", onContactDetail);
      container.addEventListener("click", onFavorite);
      createBtn.addEventListener("click", onCreate);
    },
  };
};

export default ContactsList;
