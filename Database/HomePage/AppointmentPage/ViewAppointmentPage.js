import { viewAppointmentData } from "../../Connector.js";

class ViewAppointmentPage extends HTMLElement
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
                <label for="a-date">Enter Appointment Date:</label>
                <input type="date" id="a-date" placeholder="YYYY-MM-DD" />
                <button id="submit">Submit</button>
                
                <button id="view">View All</button>
            </div>
            </div>
            <div id="appointment-data"></div>
        `;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() 
    {
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('appointment-page'));
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

    async getAppointmentDate() 
    {
    const appDate = this.querySelector("#a-date").value.trim();

    if (!appDate) 
    {
      alert("Please enter a valid Date.");
      return null;
    }

    return appDate;
    }
    getDateOnly(timestamp) 
    {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');  
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    async handleSubmit() 
    {
        const aDate = await this.getAppointmentDate();

        if (!aDate) return;

        try 
        {
        const appointmentData = await viewAppointmentData(aDate);
        console.log("Fetched data structure:", appointmentData);
        const appDate = Array.isArray(appointmentData) ? appointmentData : [appointmentData];

        const appointmentDataContainer = this.querySelector("#appointment-data");
        appointmentDataContainer.innerHTML = "";


        if (appDate && appDate.length > 0) 
        {
            this.createTable(appDate, appointmentDataContainer);
        } 
        else 
        {
            appointmentDataContainer.textContent = "No Appointment found with the given Date.";
        }
        } 
        catch (error) 
        {
        console.error("Error fetching doctor date:", error);
        alert("An error occurred while fetching doctor date.");
        }
    }

    async handleView() 
    {
        try 
        {
          const appointmentData = await viewAppointmentData();
          const appointmentDataContainer = this.querySelector("#appointment-data");
          appointmentDataContainer.innerHTML = "";

          if (appointmentData.length > 0) 
          {
            this.createTable(appointmentData, appointmentDataContainer);
          } 
          else 
          {
            appointmentDataContainer.textContent = "No appointment found.";
          }
        } 
        catch (error) 
        {
          console.error("Error fetching appointment data:", error);
          alert("An error occurred while fetching appointment data.");
        }
    }
    createTable(data, container) 
    {
        const table = document.createElement("table");

        const headers = ["ID", "DoctorID", "PatientID", "Date", "Fees"];
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
                record.doctor_id,
                record.patient_id,
                this.getDateOnly(record.date),
                record.fee  
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
customElements.define("view-appointment-page", ViewAppointmentPage);
export default ViewAppointmentPage;