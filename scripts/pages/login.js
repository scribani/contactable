import loginComponent from "../components/login-component.js";
import signupComponent from "../components/signup-component.js";
import STORE from "../store.js";

function getSection(currentSection) {
  return currentSection === "login" ? loginComponent() : signupComponent();
}

const Login = (function () {
  let section;

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
                <input class="input-login" type="email" name="email" placeholder="email" />
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
      section.addEventListeners();
    },
  };
})();

export default Login;
