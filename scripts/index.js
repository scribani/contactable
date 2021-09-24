import {
  listContacts,
  showContact,
  createContact,
  editContact,
  deleteContact,
} from "./services/contacts_fetcher.js";
import { login } from "./services/sessions_fetcher.js";

(async function () {
  const userData = await login("scribani@test.com", "123456");
  sessionStorage.setItem("token", userData.token);

  const contactsArray = await listContacts();
  console.log(contactsArray);

  const contactDetail = await showContact(22);
  console.log(contactDetail);

  const newContact = {
    name: "Test contact",
    email: "test@mail.com",
    number: "135792468",
    relation: "Work",
  };
  const createdContact = await createContact(newContact);
  console.log(createdContact);

  const testContactId = createdContact.id;

  const contactData = {
    name: "Updated test contact",
    relation: "Friends",
    favorite: true,
  };
  const updatedContact = await editContact(testContactId, contactData);
  console.log(updatedContact);

  const deletedContact = await deleteContact(testContactId);
  console.log(deletedContact);
})();
