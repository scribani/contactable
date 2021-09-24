import Login from "./pages/login.js";
import { login } from "./services/sessions_fetcher.js";
import STORE from "./store.js";

(async function () {
  
  if(sessionStorage.getItem("token")){
    try{
    const userData = await login("scribani@test.com", "123456");
    sessionStorage.setItem("token", userData.token);
    await STORE.setInitialData();
    console.log(STORE.contacts, STORE.favorites);
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
