import STORE from "../store.js";
import DOMHandler from "../dom_handler.js";
import Main from "../pages/main.js";
import { createContact } from "../services/contacts_fetcher.js";
import { CONTACTABLE } from "../constants.js";
import { mailValidation, nameValidation, numberValidation, relationValidation } from "../validations/validations.js";

async function onContactCreate(e) {
  e.preventDefault();
  const { name, email, number, Relation } = e.target;
  const validname = nameValidation(name.value);
  const validnumber = numberValidation(number.value);
  const validemail = mailValidation(email.value);
  const validerela = relationValidation(Relation.value);

  if (!validname) {
    name.className = "input-error";
    const errormsg = name.nextElementSibling;
    errormsg.style.display = "block";
  }
  if (!validnumber){
    number.className = "input-error";
    const errormsg = number.nextElementSibling;
    errormsg.style.display = "block";
  }
  if (!validemail) {
    email.className = "input-error";
    const errormsg = email.nextElementSibling;
    errormsg.style.display = "block";
  }
  if (!validerela) {
    const errormsg = Relation.nextElementSibling.nextElementSibling;
    errormsg.style.display = "block";
  }

  if ([validname, validnumber, validemail].includes(false)) return;
  const inputs = e.target.querySelectorAll("input");
  const errormsgs = e.target.querySelectorAll(".js-error-msg");

  inputs.forEach((input) => input.className = "");
  errormsgs.forEach((error) => error.style.display = "none");

  const newContact = {
    name: name.value,
    email: email.value,
    number: number.value,
    relation: Relation.value,
  };
  const userData = await createContact(newContact);
  await STORE.addContact(userData);
  STORE.currentSection = CONTACTABLE;
  DOMHandler.render(Main);
}

function onReturnToMain(e){
  e.preventDefault();
  STORE.currentSection = CONTACTABLE;
  DOMHandler.render(Main);
}

const contactCreate = () => {
  return {
    title: "<h2>Create new contact</h2>",
    toString: function () {
      return `
        <form class="js-contact-create">
          <div class="input-content">
            <input type="text" name="name" placeholder="Name" >
            <p class="js-error-msg error">Error message</p>
          </div>
          <div class="input-content">
            <input type="text" name="number" placeholder="Number" >
            <p class="js-error-msg error">Error message</p> 
          </div>
          <div class="input-content">
            <input type="text" name="email" placeholder="Email" >
            <p class="js-error-msg error">Error message</p>
          </div>
          <div class="input-content">
            <select name="Relation">
              <option hidden selected disabled>Relation</option>
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Work">Work</option>
              <option value="Acquaintance">Acquaintance</option>
            </select>
            <img src="../assets/images/Polygon 1.png" class="select-button">
            <p class="js-error-msg error">Error message</p>
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
      const container = document.querySelector(".js-contact-create");
      const btncancel = document.querySelector(".js-cancel-btn");
      container.addEventListener("submit", onContactCreate);
      btncancel.addEventListener("click", onReturnToMain )
    },
  };
};

export default contactCreate;
