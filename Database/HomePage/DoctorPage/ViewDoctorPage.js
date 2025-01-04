
import { viewDoctorData } from "../../Connector.js";

class ViewDoctorPage extends HTMLElement
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

                table 
                {
                    border-collapse: collapse;
                    width: 100%;
                    margin-top: 20px;
                    color: white;
                }

                th, td 
                {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: center;
                    background-color: #3c4043;
                }
                
                th 
                {
                    background-color: #282c34;
                    color: white;
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
          <div id="outer-container">
          <div id="form-container">
                <label for="doctor-id">Enter Doctor ID:</label>
                <input type="number" id="doctor-id" placeholder="Doctor ID" />
                <button id="submit">Submit</button>
                
                <button id="view">View All</button>
            </div>
            </div>
            <div id="doctor-data"></div>
        `;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() 
    {
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('doctor-page'));
        });

        const submitButton = this.querySelector("#submit");
        submitButton.addEventListener("click", async () => 
        {
            await this.handleSubmit();
        });

        const viewButton = this.querySelector("#view");
        viewButton.addEventListener("click", async () =>
        {
            await this.handleView();
        });
    }

    getDoctorId()
    {
        return this.querySelector("#doctor-id").value;
    }

    async handleSubmit() 
    {
        const doctorId = this.getDoctorId();
        if (!doctorId) 
        {
          alert("Please enter a valid Doctor ID.");
          return;
        }

        try 
        {
          const doctorData = await viewDoctorData(doctorId);
          const doctorDataContainer = this.querySelector("#doctor-data");
          doctorDataContainer.innerHTML = "";

          if (doctorData) 
          {
            this.createTable([doctorData], doctorDataContainer);
          }  
          else 
          {
            doctorDataContainer.textContent = "No Doctor found with the given ID.";
          }
        } 
        catch (error) 
        {
          console.error("Error fetching doctor data:", error);
          alert("An error occurred while fetching doctor data.");
        }
    }

    async handleView() 
    {
        try 
        {
          const doctorData = await viewDoctorData();
          const doctorDataContainer = this.querySelector("#doctor-data");
          doctorDataContainer.innerHTML = "";

          if (doctorData.length > 0) 
          {
            this.createTable(doctorData, doctorDataContainer);
          } 
          else 
          {
            doctorDataContainer.textContent = "No doctors found.";
          }
        } 
        catch (error) 
        {
          console.error("Error fetching doctor data:", error);
          alert("An error occurred while fetching doctor data.");
        }
    }
    getDateOnly(timestamp) 
    {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
      
    createTable(data, container) 
    {
        const table = document.createElement("table");

        const headers = ["ID", "Name", "Specialization", "Date", "Time"];
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        headers.forEach((header) => 
        {
            const th = document.createElement("th");
            th.textContent = header;
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
                record.name,
                record.specialization,
                this.getDateOnly(record.appointment_date),
                record.appointment_time || '-' 
            ];

            details.forEach((detail) => 
            {
                const td = document.createElement("td");
                td.textContent = detail;
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    }
}
customElements.define("view-doctor-page", ViewDoctorPage);
export default ViewDoctorPage;
