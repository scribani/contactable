import STORE from "../store.js";
import DOMHandler from "../dom_handler.js";
import Main from "../pages/main.js";
import { createContact, editContact } from "../services/contacts_fetcher.js";
import { CONTACT_DETAILS, CONTACTABLE } from "../constants.js";
import {
  emailValidation,
  nameValidation,
  numberValidation,
  relationValidation,
} from "../validations/validations.js";

async function onContactEdit(e) {
  e.preventDefault();
  const { name, email, number, relation } = e.target;
  const validName = nameValidation(name);
  const validNumber = numberValidation(number);
  const validEmail = emailValidation(email);
  const validRel = relationValidation(relation);

  if ([validName, validNumber, validEmail, validRel].includes(false)) return;

  const editedContact = {
    name: name.value,
    email: email.value,
    number: number.value,
    relation: relation.value,
  };
  try {
    await editContact(STORE.currentContactId, editedContact);
    STORE.updateContact(editedContact);
    STORE.currentSection = CONTACTABLE;
    DOMHandler.render(Main);
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

function returnContactDetail(e) {
  e.preventDefault();
  STORE.currentSection = CONTACT_DETAILS;
  DOMHandler.render(Main);
}

const contactEdit = () => {
  return {
    title: "<h2>Edit contact</h2>",
    toString: function () {
      const contact = STORE.getCurrentContact();
      return `
        <form class="js-contact-edit">
          <div class="input-content">
            <input type="text" name="name" placeholder="Name" value="${contact.name}" autofocus >
            <p class="js-error-msg error">Error message</p>
          </div>
          <div class="input-content">
            <input type="text" name="number" placeholder="Number" value="${contact.number}">
            <p class="js-error-msg error">Error message</p>
          </div>
          <div class="input-content">
            <input type="text" name="email" placeholder="Email" value="${contact.email}">
            <p class="js-error-msg error">Error message</p>
          </div>
          <div class="input-content">
            <select name="relation" value="${contact.relation}">
              <option hidden selected disabled>${contact.relation}</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
            <img src="../assets/images/Polygon 1.png" class="select-button">
          </div>
      `;
    },
    footer: `
    <div class="footer footer-contact">
        <div class="mp-r-25">
          <h3 class="js-cancel-btn button-blue">Cancel</h3>
        </div>
        <div class="mp-r-16">
            <button class="button-blue button-login mp-r-16" type="submit">
              Save
            </button>
        </div>
    </div>
    </form>
    `,
    addEventListeners: function () {
      const container = document.querySelector(".js-contact-edit");
      const btncancel = document.querySelector(".js-cancel-btn");

      container.addEventListener("submit", onContactEdit);
      btncancel.addEventListener("click", returnContactDetail);
    },
  };
};

export default contactEdit;
