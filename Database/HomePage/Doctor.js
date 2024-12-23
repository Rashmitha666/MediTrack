
class Doctor extends HTMLElement
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

customElements.define("m-doctor",Doctor);
export default Doctor;