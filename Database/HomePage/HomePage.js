import Patients from "./Patient.js";
import PatientPage from "./PatientPage/PatientPage.js";

import Doctor from "./Doctor.js";
import DoctorPage from "./DoctorPage/DoctorPage.js";

import Appointment from "./Appointment.js";
import AppointmentPage from "./AppointmentPage/AppointmentPage.js";

import Invoice from "./Invoice.js";
import InvoicePage from "./InvoicePage/InvoicePage.js";

class HomePage extends HTMLElement
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
            :host {
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                    justify-content: center;
                }
                body 
                {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    height: 70vh;
                    background-color: #282c34;
                    color: white;
                    gap: 10px;
                    
                }
                .home-page-class
                {
                    display: flex;
                    justify-content: center;                    
                    align-items: center;
                    gap: 50px;
                    flex-wrap: wrap;
                }
                h2
                {
                    font-size: 3em;
                    color: #fff
                    margin-bottom: 50px; 

                }
                    
            </style>
            <h2>MediTrack</h2>
           <div class= "home-page-class">
                    
           </div>
        `;

        
        const homePageElement = this.querySelector(".home-page-class");
        const patientsElement = document.createElement('m-patient');
        const doctorsElement = document.createElement('m-doctor');
        const appointmentsElement = document.createElement('m-appointment');
        const invoiceElement = document.createElement('m-invoice');

        

        homePageElement.appendChild(patientsElement);
        homePageElement.appendChild(doctorsElement);
        homePageElement.appendChild(appointmentsElement);
        homePageElement.appendChild(invoiceElement);


        patientsElement.addEventListener('click', ()=>
            
                this.loadPage("patient-page")
        );
        doctorsElement.addEventListener('click', ()=>
            
                this.loadPage("doctor-page")
        );
        appointmentsElement.addEventListener('click', ()=>

                this.loadPage("appointment-page")
        );
        invoiceElement.addEventListener('click', ()=>

                this.loadPage("invoice-page")
        )

        this.addEventListener("navigate-back", () => 
        {
                this.innerHTML = ""; 
                this.connectedCallback(); 
        });
    }
    loadPage(pageName)
    {
            this.innerHTML = ``;

            const page = document.createElement(pageName);
            this.appendChild(page);
    }

}

customElements.define("home-page",HomePage);
export default HomePage;