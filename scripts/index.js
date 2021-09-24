import DOMHandler from "./dom_handler.js";
import Login from "./pages/login.js";
import { getUser } from "./services/signup_fetcher.js";
import STORE from "./store.js";

(async function () {
  
  if(sessionStorage.getItem("token")){
    try{
   // const userData = await getUser();
    sessionStorage.setItem("token", userData.token);
    await STORE.setInitialData();
    console.log(STORE.contacts, STORE.favorites);
    DOMHandler.render(Main);
    }  catch (e){
      console.log(e);
      alert(e);
      sessionStorage.removeItem("token");
      DOMHandler.render(Login);
    }
  }else {
    DOMHandler.render(Login);
  }
  
})();
