import { login } from "./services/sessions_fetcher.js";
import STORE from "./store.js";

(async function () {
  const userData = await login("scribani@test.com", "123456");
  sessionStorage.setItem("token", userData.token);

  await STORE.setInitialData();
  console.log(STORE.contacts, STORE.favorites);
})();
