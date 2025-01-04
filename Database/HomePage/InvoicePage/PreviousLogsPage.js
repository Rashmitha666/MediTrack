import { viewBillData } from "../../Connector.js";

class PreviousLogsPage extends HTMLElement
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
                        color: white;
                        font-family: Arial, sans-serif;
                        display: flex;
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
                    box-shadow: 0 2px 4px srgba(32, 30, 30, 0.2); 
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
                button
                {
                    padding: 10px 20px;
                    font-size: 14px;
                    color: white;
                    background-color: #007bff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover 
                {
                    background-color: #0056b3;
                }
                
                #outer-container 
                {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 20px; 
                    padding: 20px;
                    border-radius: 10px; 
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
                }
           </style>
          <button id = "back"><<</button>
          <div id = "outer-container">
            <div id="form-container">
                <label for="bill-id">Enter Bill ID:</label>
                <input type="number" id="bill-id" placeholder="Bill ID:" />
                <button id="submit">Submit</button>
                
                <button id="view">View All</button>
            </div>
            <div id="bill-data"></div>

            </div>

        `;
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('invoice-page'));
        });
        const submitButton = this.querySelector("#submit");
        submitButton.addEventListener("click", async () => 
        {
            await this.handleSubmit();
        });
        const viewButton = this.querySelector("#view");
        viewButton.addEventListener("click", async ()=>
        {
            await this.handleView();
        });

    }

    getBillId()
    {
        return  this.querySelector("#bill-id").value 
    }

    async handleSubmit() 
    {
        const billID = this.getBillId();

        if (!billID) 
        {
          alert("Please enter a Bill ID.");
          return;
        }
      
        try 
        {
          const billData = await viewBillData(billID);
          const billDataContainer = this.querySelector("#bill-data");
          billDataContainer.innerHTML = "";
      
          if (billData) 
          {
            this.createTable([billData], billDataContainer);
          }  
          else 
          {
            billDataContainer.textContent = "No Bills found with the given id.";
          }
        } 
        catch (error) 
        {
          console.error("Error fetching Bill data:", error);
          alert("An error occurred while fetching bill data.");
        }
    }

    async handleView() 
    {
        try 
        {
          const billData = await viewBillData();
          const billDataContainer = this.querySelector("#bill-data");
          billDataContainer.innerHTML = "";
      
          if (billData.length > 0) 
          {
            this.createTable(billData, billDataContainer);
          } 
          else 
          {
            billDataContainer.textContent = "No bills found.";
          }
        } 
        catch (error) 
        {
          console.error("Error fetching bill data:", error);
          alert("An error occurred while fetching bill data.");
        }
    }

    createTable(data, container) 
    {
      const table = document.createElement("table");
      table.style.margin = "0 auto"; 

      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
      table.style.marginTop = "20px";
    
      const headers = ["id", "patientID","appointmentID","totalMedicineFee","totalBillAmount","medicineName","quantity"];
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
    
      headers.forEach((header) => 
      {
        const th = document.createElement("th");
        th.textContent = header;
        th.style.border = "1px solid #ccc";
        th.style.padding = "8px";
        th.style.backgroundColor = "#3c4043";
        th.style.color = "white";
        th.style.textAlign = "center";
        headerRow.appendChild(th);
      });
    
      thead.appendChild(headerRow);
      table.appendChild(thead);
    
      const tbody = document.createElement("tbody");
      data.forEach((record) => 
      {
        const row = document.createElement("tr");
        const details = [
          record.id,
          record.patientID,
          record.appointmentID,
          record.totalMedicineFee,
          record.totalBillAmount,
          record.medicineName,
          record.quantity
        ];
    
        details.forEach((detail) => {
          const td = document.createElement("td");
          td.textContent = detail;
          td.style.border = "1px solid #ccc";
          td.style.padding = "8px";
          td.style.textAlign = "center";
          row.appendChild(td);
        });
    
        tbody.appendChild(row);
      });
    
      table.appendChild(tbody);
      container.appendChild(table);
    }
}
customElements.define("previous-logs-invoice-page", PreviousLogsPage);
export default PreviousLogsPage;