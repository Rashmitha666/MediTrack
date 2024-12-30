import HomePage from "./HomePage/HomePage.js";
import LoginPage from "./LoginPage.js"; 

class App extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `<m-login></m-login>`;
        const loginPage = this.querySelector('m-login');
        loginPage.addEventListener('login-success', () => {
            this.handleLoginSuccess();
        });
    }
    handleLoginSuccess() {
        this.innerHTML = '';
        const homePage = document.createElement('home-page');
        this.appendChild(homePage);
    }
}

customElements.define('my-app', App);
export default App;
