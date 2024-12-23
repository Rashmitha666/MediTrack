import Patients from "./Patients.js";

class HomePage extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize()
    {

    }

    connectedCallback()
    {
        this.innerHTML = 
        `
            <div style="background-color: red; width: 500px; height: 300px;">
                hi
            </div>
        `;
        const patientsElement = document.createElement('m-patients');
        this.appendChild(patientsElement);
    }

}

customElements.define("home-page",HomePage);
export default HomePage;