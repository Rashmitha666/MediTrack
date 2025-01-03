import { insertAppointment, getPhoneNumber } from "../../Connector.js";
import { sendSMS } from "../../ApiConnection.js";

class BookAppointmentPage extends HTMLElement
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
            body
                {
                    background-color: #282c34;

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
                    box-shadow: 0 2px 4px srgba(32, 30, 30, 0.2); 
                }

                #back:hover 
                {
                    background-color: rgba(10, 9, 9, 0.1); 
                }

                .container 
                {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 50px 10px;
                    height: calc(80vh - 20px);  
                    overflow: hidden;           

                }

                .book-patients 
                {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    max-width: 400px;
                    gap: 15px;
                }

                label 
                {
                    font-size: 1.2rem;
                    color: white;
                }

                input 
                {
                    padding: 8px;
                    font-size: 1rem;
                    width: 100%;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button[type="submit"] 
                {
                    padding: 10px 15px;
                    font-size: 1rem;
                    background-color: lightblue;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button[type="submit"]:hover 
                {
                    background-color: #1e90ff;
                }
           </style>
          <button id = "back"><<</button>
          <div class="container">
                <div class="book-patients">
                    <label for="id">ID:</label>
                    <input type="number" id="id" name="id" placeholder="Enter ID" step="1">

                    <label for="patientId">Patient ID:</label>
                    <input type="number" id="patientId" name="patientId" placeholder="Enter Patient ID">

                    <label for="doctorId">Doctor ID:</label>
                    <input type="number" id="doctorId" name="doctorId" placeholder="Enter Doctor ID" min="0">

                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" placeholder="Select Date">

                    <label for="fee">Fee:</label>
                    <input type="number" id="fee" name="fee" placeholder="Enter Fee" min="0" step="0.01">


                    <button type="submit" id="submitButton">Submit</button>
                </div>
            </div>
        `;
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('appointment-page'));
        });

        const submitButton = this.querySelector("#submitButton");
        submitButton.addEventListener("click", async () => 
        {
            await this.handleSubmit();
        });
            
        
        
        

    }
    getData() 
    {
        return {
            id: document.getElementById('id').value,
            doctorId: document.getElementById('doctorId').value,
            patientId: document.getElementById('patientId').value,
            date: document.getElementById('date').value,
            fee: document.getElementById('fee').value
        };
    }
    
    async handleSubmit() 
    {
        const appointmentData = this.getData();
        try 
        
        {
            await insertAppointment(appointmentData);
            const rawPhoneNumber = await getPhoneNumber(appointmentData.id);
            if (rawPhoneNumber) 
            {
            console.log(`Sending SMS to: ${rawPhoneNumber}`);

            await sendSMS(rawPhoneNumber, appointmentData.date);
            } 
            else 
            {
                console.error('Phone number not found for appointment.');
            }
                alert('Appoimtment data inserted successfully.');

        } 
        catch (error) 
        {
            console.error('Error inserting Appoimtment data:', error);
        }
    }
    
}
customElements.define("book-appointment-page", BookAppointmentPage);
export default BookAppointmentPage;