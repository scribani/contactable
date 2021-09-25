import loginComponent from "../components/login-component.js";
import signupComponent from "../components/signup-component.js";
import { LOGIN, SIGNUP } from "../constants.js";
import DOMHandler from "../dom_handler.js";
import { login } from "../services/sessions_fetcher.js";
import { signup } from "../services/signup_fetcher.js";
import STORE from "../store.js";
import Main from "./main.js";

async function onFormSubmit(e) {
  e.preventDefault();
  const section = STORE.currentSection;

  try {
    const { email, password } = e.target;
    const userData = await (section === "login"
      ? login(email.value, password.value)
      : signup(email.value, password.value));
    sessionStorage.setItem("token", userData.token);
    await STORE.setInitialData();
    DOMHandler.render(Main);
  } catch (e) {
    console.log(e);
    alert(e);
  }
}

function onFollowLink(e) {
  e.preventDefault();
  const section = STORE.currentSection;

  STORE.currentSection = section === "login" ? SIGNUP : LOGIN;
  DOMHandler.render(Login);
}

const Login = (function () {
  let section;

  function getSection(currentSection) {
    return currentSection === "login" ? loginComponent() : signupComponent();
  }

  return {
    render: function () {
      section = getSection(STORE.currentSection);
      return `
      <section>
        <div class="body-app body-form">
          <div class="header">
            <h2>${section.title}</h2>
          </div>
          <form class="js-login-form">
            <div class="login_inputs">
              <div>
                <input class="input-login" type="email" name="email" placeholder="email" autofocus />
              </div>
              <div>
                <input class="input-login" type="password" name="password" placeholder="password" />
              </div>
            </div>
            <div class="footer">
              ${section.footer}
            </div>
          </form>
        </div>
      </section>
      `;
    },
    addEventListeners: function () {
      const form = document.querySelector(".js-login-form");
      const link = document.querySelector(".js-link");

      form.addEventListener("submit", onFormSubmit);
      link.addEventListener("click", onFollowLink);
    },
  };
})();

export default Login;
