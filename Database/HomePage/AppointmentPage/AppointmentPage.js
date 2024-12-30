import BookAppointmentPage from "./BookAppointmentPage.js";
import CancelAppointmentPage from "./CancelAppointmentPage.js";
import ViewAppointmentPage from "./ViewAppointmentPage.js";

class AppointmentPage extends HTMLElement
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

                .book-appointment 
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

                .book-appointment:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .cancel-appointment 
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

                .cancel-appointment:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .view-appointment 
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

                .view-appointment:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
            </style>

            <div class="container">
            <button id = "back"><<</button>
            <h1>Appointment Page</h1>
            <div class="grid">
                <div class= "book-appointment">Book Appointment</div>
                <div class= "cancel-appointment">Cancel Appointment</div>
                <div class= "view-appointment">View <br>Appointment</div>
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

        const BookAppointmentElement = this.querySelector(".book-appointment");
        const CancelAppointmentElement = this.querySelector(".cancel-appointment");
        const ViewAppointmentElement = this.querySelector(".view-appointment");

        BookAppointmentElement.addEventListener('click', () => this.loadPage("book-appointment-page"));
        CancelAppointmentElement.addEventListener('click', () => this.loadPage("cancel-appointment-page"));
        ViewAppointmentElement.addEventListener('click', () => this.loadPage("view-appointment-page"));

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

customElements.define("appointment-page", AppointmentPage);
export default AppointmentPage