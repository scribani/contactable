import { logout } from "../services/sessions_fetcher.js";
import ContactDetails from "../components/contact-details.js";
import {
  CONTACTABLE,
  CONTACT_DETAILS,
  CREATE_CONTACT,
  EDIT_CONTACT,
} from "../constants.js";
import STORE from "../store.js";
import DOMHandler from "../dom_handler.js";
import Login from "./login.js";
import ContactsList from "../components/contacts-list.js";
import contactCreate from "../components/contact-create.js";
import contactEdit from "../components/contact-edit.js";

function getSection(currentSection) {
  switch (currentSection) {
    case CREATE_CONTACT:
      return contactCreate();
    case CONTACT_DETAILS:
      return ContactDetails();
    case EDIT_CONTACT:
      return contactEdit();
    case CONTACTABLE:
      return ContactsList();
  }
}

async function onLogout(e) {
  e.preventDefault();
  try {
    await logout();
    STORE.clear();
    DOMHandler.render(Login);
  } catch (e) {
    alert(e);
  }
}

const Main = (function () {
  let section;

  return {
    render: function () {
      section = getSection(STORE.currentSection);
      return `
      <header class="header">
        ${section.title}
        <a href="#logout" class="js-logout button-blue mp-r-25">Logout</a>
      </header>
      ${section}
      ${section.footer ? section.footer : ""}
      `;
    },
    addEventListeners: function () {
      const logoutBtn = document.querySelector(".js-logout");
      logoutBtn.addEventListener("click", onLogout);

      section.addEventListeners();
    },
  };
})();

export default Main;
