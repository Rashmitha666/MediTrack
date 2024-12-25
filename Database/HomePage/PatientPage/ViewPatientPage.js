import { viewPatientData } from "../../Connector.js";

class ViewPatientPage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = 
        `
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
                <label for="patient-id">Enter Patient ID:</label>
                <input type="number" id="patient-id" placeholder="Patient ID" />
                <button id="submit">Submit</button>
            </div>
            <div id="patient-data"></div>

        `;
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('patient-page'));
        });
        const submitButton = this.querySelector("#submit");
        submitButton.addEventListener("click", async () => {
            await this.handleSubmit();
        });
    }

    getPatientId()
    {
        return  this.querySelector("#patient-id").value 
    }
    async handleSubmit() 
    {
        const patientId = this.getPatientId();
        try 
        
        {
            const patientData = await viewPatientData(patientId);
            if (patientData) 
            {
                alert(`Patient Data: ${JSON.stringify(patientData)}`);
            } 
            else 
            {
                alert('No patient found with the given ID.');
            }
        } 
        catch (error) 
        {
            console.error('Error fetching patient data:', error);
        }
    }
}

customElements.define("view-patient-page", ViewPatientPage);
export default ViewPatientPage;