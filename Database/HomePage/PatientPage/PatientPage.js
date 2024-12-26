import AddPatientPage from "./AddPatientPage.js";
import ViewPatientPage from "./ViewPatientPage.js";
import DeletePatientPage from "./DeletePatientPage.js";

class PatientPage extends HTMLElement
{
    constructor()
    {
        super();
    }

    connectedCallback()
    {

        this.innerHTML =
        `
            <style>
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
                    box-shadow: 0 2px 4px srgba(32, 30, 30, 0.2); 
                }

                #back:hover 
                {
                    background-color: rgba(0, 255, 123, 0.65); 
                }
                
                * 
                {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body 
                {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #282c34;
                    color: white;
                }

                .container 
                {
                    text-align: center;
                    margin: 0 auto;
                    max-width:500px;
                }

                h1 
                {
                    font-size: 2.5rem;
                    margin-bottom: 40px;        
                }

                .grid 
                {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 20px;
                }

                .add-patient 
                {
                    background-color: lightblue;
                    width: 350px;
                    height: 260px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    color: black;
                    font-size: 1.2rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.3s, background-color 0.3s;
                }

                .add-patient:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .view-patient 
                {
                    background-color: lightblue;
                    width: 350px;
                    height: 260px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    color: black;
                    font-size: 1.2rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.3s, background-color 0.3s;
                }

                .view-patient:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .delete-patient 
                {
                    background-color: lightblue;
                    width: 350px;
                    height: 260px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    color: black;
                    font-size: 1.2rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.3s, background-color 0.3s;
                }

                .delete-patient:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                
            </style>

            <div class="container">
            <button id = "back"><<</button>
            <h1>Patient Page</h1>
            <div class="grid">
                <div class= "add-patient">Add Patients</div>
                <div class= "view-patient">View Patients</div>
                <div class= "delete-patient">Delete Patients</div>
            </div>
        </div>
        `;

        this.querySelector("#back").addEventListener('click', () =>
        {
            this.dispatchEvent(new CustomEvent("navigate-back", { bubbles: true, composed: true }));
        });

        const AddPatientElement = this.querySelector(".add-patient");
        const ViewPatientElement = this.querySelector(".view-patient");
        const DeletePatientElement = this.querySelector(".delete-patient");

        AddPatientElement.addEventListener('click', () => this.loadPage("add-patient-page"));
        ViewPatientElement.addEventListener('click', () => this.loadPage("view-patient-page"));
        DeletePatientElement.addEventListener('click', () => this.loadPage("delete-patient-page"));


        this.addEventListener("navigate-back", () => 
        {
            if (this.isConnected) 
            {
                this.innerHTML = ""; 
                this.connectedCallback(); 
            }
        });
    }

    loadPage(pageName)
    {
        if (this.isConnected)
        {
            this.innerHTML = ``;
            const page = document.createElement(pageName);
            this.appendChild(page);
        }
    }
}

customElements.define("patient-page", PatientPage);
export default PatientPage;
