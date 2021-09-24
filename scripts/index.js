import DOMHandler from "./dom_handler.js";
import Login from "./pages/login.js";
import Main from "./pages/main.js";
import STORE from "./store.js";

(async function () {
  if (sessionStorage.getItem("token")) {
    try {
      await STORE.setInitialData();
      DOMHandler.render(Main);
    } catch (e) {
      console.log(e);
      alert(e);
      sessionStorage.removeItem("token");
      DOMHandler.render(Login);
    }
  } else {
    DOMHandler.render(Login);
  }
})();
