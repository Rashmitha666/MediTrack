import DoctorPage from "./DoctorPage.js";

class AdminLoginPage extends HTMLElement 
{
    constructor() 
    {
        super();
    }

    connectedCallback() 
    {
        this.innerHTML = `
            <style>
                body 
                {
                    background-color: #282c34;
                    color: white;
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                }
                #back 
                {
                    position: fixed;
                    top: 10px;
                    left: 10px;
                    background-color: grey;
                    color: white;
                    border: 1px solid white;
                    border-radius: 50%;
                    cursor: pointer;
                    z-index: 1000;
                    font-size: 14px;
                    padding: 5px 10px;
                    box-shadow: 0 2px 4px rgba(32, 30, 30, 0.2);
                }

                #back:hover 
                {
                    background-color: rgba(10, 9, 9, 0.1);
                }

                #form-container 
                {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                    padding: 20px;
                    background-color: #3c4043;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    width: 300px;
                }

                label 
                {
                    font-size: 16px;
                    color: white;
                }

                input 
                {
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    width: 100%;
                }

                button#submit 
                {
                    padding: 10px 20px;
                    font-size: 14px;
                    color: white;
                    background-color: #007bff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button#submit:hover 
                {
                    background-color: #0056b3;
                }
            </style>
            
            <button id="back"> << </button>

            <div id="form-container">
                <label for="username">Username:</label>
                <input type="text" id="username" placeholder="Enter username" />
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Enter password" />
                <button id="submit">Login</button>
            </div>
        `;

        const button = this.querySelector('#submit');

        button.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('login-success', { bubbles: true, composed: true }));
        });

        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('doctor-page'));
        });
    }
}

customElements.define('admin-login-page', AdminLoginPage);
export default AdminLoginPage;