
class Patients extends HTMLElement
{
    constructor()
    {
        super();
    }

    initialize()
    {

    }

    connectedCallback()
    {
        this.innerHTML = 
        `
            <style>
                
            </style>
            <div style="background-color: lightblue; width: 300px; height: 200px;">
                hi
            </div>
        `;

        
    }
}

customElements.define("m-patients",Patients);
export default Patients;