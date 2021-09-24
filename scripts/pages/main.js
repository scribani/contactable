import ContactDetails from "../components/contact-details.js";
import { CONTACT_DETAILS, CREATE_CONTACT, EDIT_CONTACT } from "../constants.js";
import STORE from "../store.js";

function getSection(currentSection) {
  switch (currentSection) {
    case CREATE_CONTACT:
      return {
        toString: () => "Create new contact",
        addEventListeners: () => {},
      };
    case CONTACT_DETAILS:
      return ContactDetails();
    case EDIT_CONTACT:
      return {
        toString: () => "Edit selected contact",
        addEventListeners: () => {},
      };
    default:
      return {
        toString: () => "Contactable's contacts list",
        addEventListeners: () => {},
      };
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
        <a href="#logout" class="button-blue mp-r-25">Logout</a>
      </header>
      ${section}
      ${Boolean(section.footer) ? section.footer : ""}
      `;
    },
    addEventListeners: function () {
      section.addEventListeners();
    },
  };
})();

export default Main;
