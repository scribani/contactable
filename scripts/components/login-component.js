import { SIGNUP } from "../constants.js";
import DOMHandler from "../dom_handler.js";
import Login from "../pages/login.js";
import Main from "../pages/main.js";
import { login } from "../services/sessions_fetcher.js";
import STORE from "../store.js";

async function loginUser(e) {
  e.preventDefault();
  const { email, password } = e.target;
  const userData = await login(email.value, password.value);
  sessionStorage.setItem("token", userData.token);
  await STORE.setInitialData();
  DOMHandler.render(Main);
}

function onSignUp(e) {
  e.preventDefault();
  STORE.currentSection = SIGNUP;
  DOMHandler.render(Login);
}

const loginComponent = () => {
  return {
    title: "Login",
    footer: `
    <a class="js-signup button-blue mp-r-25" href="#signup">Signup</a>
    <button class="button-blue button-login mp-r-16">
      Login
    </button>
    `,
    addEventListeners: function () {
      const form = document.querySelector(".js-login-form");
      const signupBtn = document.querySelector(".js-signup");

      form.addEventListener("submit", loginUser);
      signupBtn.addEventListener("click", onSignUp);
    },
  };
};

export default loginComponent;
