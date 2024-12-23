
class Appointment extends HTMLElement
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

        `;

    }
}

customElements.define("m-appointment",Appointment);
export default Appointment;