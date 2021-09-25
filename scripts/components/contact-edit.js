import STORE from "../store.js";
import DOMHandler from "../dom_handler.js";
import Main from "../pages/main.js";
import { createContact, editContact } from "../services/contacts_fetcher.js";
import { CONTACTABLE } from "../constants.js";

async function onContactEdit(e) {
  e.preventDefault();
  const { name, email, number, Relation } = e.target;
  const newContact = {
    name: name.value,
    email: email.value,
    number: number.value,
    relation: Relation.value,
  };

  const userData = await editContact(STORE.currentContactId, newContact);
  await STORE.updateContact(newContact);
  STORE.currentSection = CONTACTABLE;
  DOMHandler.render(Main);
}

const contactEdit = () => {
  return {
    title: "<h2>Create new contact</h2>",
    toString: function () {
      const contact = STORE.getCurrentContact();
      return `
      <section class="section body-app body-form>
        <form class="js-contact-edit">
          <div class="input-content">
            <input type="text" name="name" placeholder="Name" value="${contact.name}" required>
          </div>
          <div class="input-content">
            <input type="number" name="number" placeholder="Number" value="${contact.number}" required>
          </div>
          <div class="input-content">
            <input type="email" name="email" placeholder="Email" value="${contact.email}" required>
          </div>
          <div class="input-content">
            <select name="Relation" value="${contact.relation}" required>
              <option hidden selected disabled>Relation</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
            <img src="../assets/images/Polygon 1.png" class="select-button">
          </div>
        </form>
      </section>
      `;
    },
    footer: `
    <div class="footer">
        <div class="mp-r-25">
          <h3 class="button-blue">Cancel</h3>
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

      container.addEventListener("submit", onContactEdit);
    },
  };
};

export default contactEdit;
