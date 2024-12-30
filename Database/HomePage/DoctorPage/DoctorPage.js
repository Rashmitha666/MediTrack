import ViewDoctorPage from "./ViewDoctorPage.js";
import CheckDoctorPage from "./CheckDoctorPage.js";
import AddDoctorPage from "./AddDoctorPage.js";
import DeleteDoctorPage from "./DeleteDoctorPage.js";


class DoctorPage extends HTMLElement
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
                    background-color: rgba(10, 9, 9, 0.1); 
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

                .add-doctor 
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

                .add-doctor:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .view-doctor 
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

                .view-doctor:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .check-doctor 
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

                .check-doctor:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .delete-doctor 
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

                .delete-doctor:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                
            </style>

            <div class="container">
            <button id = "back"><<</button>
            <h1>Doctor Page</h1>
            <div class="grid">
                <div class= "view-doctor">View Doctors</div>
                <div class= "check-doctor">Check Doctors</div>
                <div class= "add-doctor">Add <br>Doctor</div>
                <div class= "delete-doctor">Delete Doctor</div>

                </div>
        </div>
        `;
        this.querySelector("#back").addEventListener('click', () =>
        {
            this.dispatchEvent(new CustomEvent("navigate-back", { bubbles: true, composed: true }));
        });
        this.addEventListener("navigate-back", () => 
        {
            if (this.isConnected) 
            {
                this.innerHTML = ""; 
                this.connectedCallback(); 
            }
        });

        const AddDoctorElement = this.querySelector(".add-doctor");
        const ViewDoctorElement = this.querySelector(".view-doctor");
        const DeleteDoctorElement = this.querySelector(".delete-doctor");
        const CheckDoctorElement = this.querySelector(".check-doctor");

        AddDoctorElement.addEventListener('click', () => this.loadPage("add-doctor-page"));
        ViewDoctorElement.addEventListener('click', () => this.loadPage("view-doctor-page"));
        DeleteDoctorElement.addEventListener('click', () => this.loadPage("delete-doctor-page"));
        CheckDoctorElement.addEventListener('click', () => this.loadPage("check-doctor-page"));

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

customElements.define("doctor-page", DoctorPage);
export default DoctorPage