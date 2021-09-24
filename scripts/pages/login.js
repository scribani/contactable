import { login } from "../services/sessions_fetcher.js";
import STORE from "../store.js";

const Login = (function () {
  async function loginUser(e) {
    e.preventDefault();
    const { email, password } = e.target;
    const userData = await login(email.value, password.value);
    sessionStorage.setItem("token", userData.token);
    await STORE.setInitialData(userData);
    DOMHandler.render(Main);
  }

  return {
    render: function () {
      return `
      <section>
      <div class="body-app">
        <div class="header">
          <h3>Login</h3>
        </div>
        <form class="js-login-form">
          <div class="login_inputs">
            <div>
              <input type="email" name="email" placeholder="email" />
            </div>
            <div>
              <input type="password" name="password" placeholder="password" />
            </div>
          </div>
          <div class="footer">
            <a class="button-blue mp-r-25" href="#signup">Signup</a>
            <button class="button-blue button-login mp-r-16" type="Login">
              Login
            </button>
        </form>
      </div>
      </div>
    </section>
      `;
    },
    addEventListeners: function () {
      const form = document.querySelector(".js-login-form");
      form.addEventListener("submit", loginUser);
    },
  };
})();

export default Login;
