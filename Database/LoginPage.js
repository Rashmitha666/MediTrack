class LoginPage extends HTMLElement 
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

    }
}

customElements.define('m-login', LoginPage);
export default LoginPage;