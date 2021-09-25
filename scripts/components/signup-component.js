import { LOGIN } from "../constants.js";
import DOMHandler from "../dom_handler.js";
import Login from "../pages/login.js";
import Main from "../pages/main.js";
import { signup } from "../services/signup_fetcher.js";
import STORE from "../store.js";

async function signupUser(e) {
  e.preventDefault();
  const { email, password } = e.target;
  const userData = await signup(email.value, password.value);
  sessionStorage.setItem("token", userData.token);
  await STORE.setInitialData();
  DOMHandler.render(Main);
}

function onLogin(e) {
  e.preventDefault();
  STORE.currentSection = LOGIN;
  DOMHandler.render(Login);
}

const signupComponent = () => {
  return {
    title: "Signup",
    footer: `
    <a class="js-login button-blue mp-r-25" href="#login">Login</a>
    <button class="button-blue button-login mp-r-16">
      Create Account
    </button>
    `,
    addEventListeners: function () {
      const form = document.querySelector(".js-login-form");
      const loginBtn = document.querySelector(".js-login");

      form.addEventListener("submit", signupUser);
      loginBtn.addEventListener("click", onLogin);
    },
  };
};

export default signupComponent;
