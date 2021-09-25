import STORE from "../store.js";
import DOMHandler from "../dom_handler.js";
import Main from "../pages/main.js";
import { createContact } from "../services/contacts_fetcher.js";


async function onContacCreate(e){
  e.preventDefault();
  const { name, email, number, Relation } = e.target;
  const newContact = {
    name: name.value,
    email: email.value,
    number: number.value,
    relation: Relation.value,
  };
  const userData = await createContact(newContact);
  await STORE.addContact(userData);
  STORE.currentSection = "";
  DOMHandler.render(Main);
}

const contactCreate = () => {
  return {
    title: "<h2>Create new contact</h2>",
    toString: function () {
     // const contact = STORE.getCurrentContact();
      return `
      <form class="js-contact-create">
      <div class="input-content">
            <input type="text" name="name" placeholder="Name" required>
        </div>
        <div class="input-content">
            <input type="number" name="number" placeholder="Number" required>
        </div>
        <div class="input-content">
            <input type="email" name="email" placeholder="Email" required>
            <p class="error">Error message</p>
        </div>
        <div class="input-content">
            <select name="Relation" required>
                <option hidden selected disabled>Relation</option>
                <option value="Family">Family</option>
                <option value="Friends">Friends</option>
                <option value="Work">Work</option>
                <option value="Acquaintance">Acquaintance</option>
            </select>
            <img src="../assets/images/Polygon 1.png" class="select-button">
        </div>
      </div>
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
      const container = document.querySelector(".js-contact-create");

      container.addEventListener("submit", onContacCreate);
      // container.addEventListener("click", onContactDelete);
      // container.addEventListener("click", onContactEdit);
    },
  };
}

export default contactCreate;