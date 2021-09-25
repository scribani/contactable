import { logout } from "../services/sessions_fetcher.js";
import ContactDetails from "../components/contact-details.js";
import { CONTACT_DETAILS, CREATE_CONTACT, EDIT_CONTACT } from "../constants.js";
import STORE from "../store.js";
import DOMHandler from "../dom_handler.js";
import Login from "./login.js";
import ContactsList from "../components/contacts-list.js";
import contacCreate from "../components/contact-create.js";

function getSection(currentSection) {
  switch (currentSection) {
    case CREATE_CONTACT:
      return contacCreate();
    case CONTACT_DETAILS:
      return ContactDetails();
    case EDIT_CONTACT:
      return {
        toString: () => {
          const contact = STORE.getCurrentContact();
          return `
          <p>Edit selected contact</p>
          <form>
          <input type="text" name="name" value="${contact.name}" />
          </form>
          `;
        },
        addEventListeners: () => {},
      };
    default:
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
