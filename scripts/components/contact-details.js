import { deleteContact } from "../services/contacts_fetcher.js";
import { CONTACTABLE, EDIT_CONTACT } from "../constants.js";
import DOMHandler from "../dom_handler.js";
import Main from "../pages/main.js";
import STORE from "../store.js";

function onReturnToMain(e) {
  e.preventDefault();
  const backBtn = e.target.classList.contains("js-back");
  if (backBtn) {
    STORE.currentSection = CONTACTABLE;
    DOMHandler.render(Main);
  }
}

async function onContactDelete(e) {
  e.preventDefault();
  const deleteBtn = e.target.classList.contains("js-delete");
  if (deleteBtn) {
    try {
      const id = STORE.currentContactId;
      await deleteContact(id);
      STORE.deleteContact(id);
      STORE.currentSection = CONTACTABLE;
      DOMHandler.render(Main);
    } catch (e) {
      alert(e);
    }
  }
}

function onContactEdit(e) {
  e.preventDefault();
  const editBtn = e.target.classList.contains("js-edit");
  if (editBtn) {
    STORE.currentSection = EDIT_CONTACT;
    DOMHandler.render(Main);
  }
}

const ContactDetails = () => {
  return {
    title: "<h2>Contact Detail</h2>",
    toString: function () {
      const contact = STORE.getCurrentContact();
      return `
      <section class="section contact-detail-card">
        <img src="../assets/images/Rectangle.png" class="avatar" />
        <h5 class="contact-name">${contact.name}</h5>
        <h6 class="relation">${contact.relation}</h6>
        <div class="info-container">
          <h6>Number</h6>
          <p>${contact.number}</p>
        </div>
        <div class="info-container">
          <h6>Email</h6>
          <p>${contact.email}</p>
        </div>
      </section>
      `;
    },
    footer: `
    <footer class="js-footer footer">
      <a class="js-back button-blue mp-r-25" href="#back">Back</a>
      <a class="js-delete button-blue mp-r-25" href="#delete">Delete</a>
      <a class="js-edit button-blue mp-r-25" href="#edit">Edit</a>
    </footer>
    `,
    addEventListeners: function () {
      const container = document.querySelector(".js-footer");

      container.addEventListener("click", onReturnToMain);
      container.addEventListener("click", onContactDelete);
      container.addEventListener("click", onContactEdit);
    },
  };
};

export default ContactDetails;
