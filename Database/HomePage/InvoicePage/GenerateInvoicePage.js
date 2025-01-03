import { insertBill } from "../../Connector.js";
import { getUnitprice } from "../../Connector.js";
import { getConsultationFee } from "../../Connector.js";

class GenerateInvoicePage extends HTMLElement
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

                .generate-bill 
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
                <div class="generate-bill">
                    <label for="id">ID:</label>
                    <input type="number" id="id" name="id" placeholder="Enter Bill ID" step="1">

                    <label for="patientId">Patient ID:</label>
                    <input type="number" id="patientId" name="patientId" placeholder="Enter Patient ID">

                    <label for="appointmentId">Appointment ID:</label>
                    <input type="number" id="appointmentId" name="appointmentId" placeholder="Enter Appointment ID" min="0">

                    <label for="medicineName">Medicine Name:</label>
                    <input type="text" id="medicineName" name="medicineName" placeholder="Enter Medicine Name">

                    <label for="quantity">Quantity:</label>
                    <input type="number" id="quantity" name="quantity" placeholder="Enter Quantity" min="1">


                    <button type="submit" id="submitButton">Submit</button>
                </div>
            </div>
        `;
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('invoice-page'));
        });
        const submitButton = this.querySelector("#submitButton");
        submitButton.addEventListener("click", async () => {
            await this.handleSubmit();
        });

        
    }

    async getUnitPriceOfMedicine() 
    {
        const medicineName = this.querySelector("#medicineName").value;
        const quantity = parseInt(this.querySelector("#quantity").value, 10);
    
        try 
        {
            const result = await getUnitprice(medicineName);
            if (result && result.unitPrice) 
            {
                const unitPrice = parseFloat(result.unitPrice);
                return unitPrice * quantity; 
            } 
            else 
            {
                return 0;
            }
        } 
        catch (error) 
        {
            console.error('Error fetching unit price:', error);
        }
    }
    

    async getFee() 
    {
        const appointmentId = this.querySelector("#appointmentId").value;
    
        try 
        {
            const result = await getConsultationFee(appointmentId);
            if (result && result.fee) 
            {
                return parseFloat(result.fee);
            } 
            else 
            {
                return 0;    
            }

        } 
        catch (error) 
        {
            console.error('Error fetching consultation fee:', error);
        }
    }
    
    async getData() 
    {
        const id = document.getElementById('id').value || null;
        const patientID = document.getElementById('patientId').value || null;
        const appointmentID = document.getElementById('appointmentId').value || null;
        const medicineName = document.getElementById('medicineName').value || '';
        const quantity = document.getElementById('quantity').value || 0;
    
        const [totalMedicineFee, consultationFee] = await Promise.all([
            this.getUnitPriceOfMedicine(),
            this.getFee()
        ]);
    
        const totalBillAmount = totalMedicineFee + consultationFee;
    
        return {
            id,
            patientID,
            appointmentID,
            medicineName,
            quantity,
            totalMedicineFee,
            totalBillAmount
        };
    }
    
    
    async handleSubmit() 
    {
        try 
        {
            const billData = await this.getData();
    
            await insertBill(billData);
            console.log(billData);

            alert('Bill inserted successfully.');
        } 
        catch (error) 
        {
            console.error('Error inserting Bill data:', error);
        }
    }
    
    
    
}
customElements.define("generate-invoice-page", GenerateInvoicePage);
export default GenerateInvoicePage;