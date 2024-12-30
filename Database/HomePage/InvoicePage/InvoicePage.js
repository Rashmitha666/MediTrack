import GenerateInvoicePage from "./GenerateInvoicePage.js";
import PreviousLogsPage from "./PreviousLogsPage.js";
import ViewStocksPage from "./ViewStocksPage.js";

class InvoicePage extends HTMLElement
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

                .generate-invoice 
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

                .generate-invoice:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .view-stocks-invoice 
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

                .view-stocks-invoice:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                .previous-logs-invoice 
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

                .previous-logs-invoice:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
                
            </style>

            <div class="container">
            <button id = "back"><<</button>
            <h1>Invoice Page</h1>
            <div class="grid">
                <div class= "generate-invoice">Generate Invoice</div>
                <div class= "view-stocks-invoice">View Stocks</div>
                <div class= "previous-logs-invoice">Previous <br>Logs</div>
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

        const GenerateInvoiceElement = this.querySelector(".generate-invoice");
        const ViewStocksElement = this.querySelector(".view-stocks-invoice");
        const PreviousLogsElement = this.querySelector(".previous-logs-invoice");

        GenerateInvoiceElement.addEventListener('click', () => this.loadPage("generate-invoice-page"));
        ViewStocksElement.addEventListener('click', () => this.loadPage("view-stocks-invoice-page"));
        PreviousLogsElement.addEventListener('click', () => this.loadPage("previous-logs-invoice-page"));

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

customElements.define("invoice-page", InvoicePage);
export default InvoicePage