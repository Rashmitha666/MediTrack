import {insertPatientData} from '../../Connector.js';

class AddPatientPage extends HTMLElement
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

                .add-patients 
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

            <button id="back"> << </button>
            <div class="container">
                <div class="add-patients">
                    <label for="id">ID:</label>
                    <input type="text" id="id" name="id" placeholder="Enter ID">

                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter Name">

                    <label for="age">Age:</label>
                    <input type="number" id="age" name="age" placeholder="Enter Age">

                    <label for="gender">Gender:</label>
                    <select id="gender" name="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label for="phone">Phone Number:</label>
                    <input type="text" id="phone" name="phone" placeholder="Enter Phone Number">

                    <button type="submit" id="submitButton">Submit</button>
                </div>
            </div>
        `;

        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('patient-page'));
        });

        const submitButton = this.querySelector("#submitButton");
        submitButton.addEventListener("click", async () => {
            await this.handleSubmit();
        });
    }
    getPatientData() 
    {
        return {
          id: this.querySelector('#id').value,
          name: this.querySelector('#name').value,
          age: this.querySelector('#age').value,
          gender: this.querySelector('#gender').value,
          phoneNumber: this.querySelector('#phone').value
        };
    }

    async handleSubmit() 
    {
        const patientData = this.getPatientData();
        try 
        
        {
            await insertPatientData(patientData);
            alert('Patient data inserted successfully.');
        } 
        catch (error) 
        {
            console.error('Error inserting patient data:', error);
        }
    }
    
        
  
}


customElements.define("add-patient-page", AddPatientPage);
export default AddPatientPage;
