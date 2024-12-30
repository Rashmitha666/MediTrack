
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
           </style>
          <button id = "back"><<</button>
        `;
        const backButton = this.querySelector("#back");
        backButton.addEventListener("click", () => 
        {
            this.replaceWith(document.createElement('appointment-page'));
        });


    }
}
customElements.define("book-appointment-page", BookAppointmentPage);
export default BookAppointmentPage;