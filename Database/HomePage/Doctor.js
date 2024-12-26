
class Doctor extends HTMLElement
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
                :host
                {
                    font-family: Arial, sans-serif;
                    display: block;
                    margin: 0;
                    padding: 0;
                    
                }
                .doctor-class
                {
                    background-color: lightblue;
                    width: 150px;
                    height: 270px;
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
                .doctor-class:hover 
                {
                    transform: scale(1.1);
                    background-color: #1e90ff;
                    color: white;
                }
            </style>
            <div class = "doctor-class">
                Doctor
            </div>
        `;

    }
}

customElements.define("m-doctor",Doctor);
export default Doctor;