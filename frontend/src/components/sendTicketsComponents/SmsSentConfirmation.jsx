import React, {Component} from "react";

class SmsSentConfirmation extends Component {

    constructor(props) {
        super(props)
    }
  
    render() {
        
        let content;

        if (!this.props.isConfirmed) {
            content = <div className="text-gray-900 text-center font-extrabold pt-5">Billett(ene) ble ikke sendt</div>
        }
        else {
            content = 
            
            <div className="flex flex-col py-6">

                <div className="py-4 text-gray-900 text-center font-extrabold">
                    Billettene ble sendt
                </div>

                <div className="py-4 text-gray-700 font-bold text-center">
                    Takk for at du bruker VY sitt nye billettdelingssystem!
                </div>

                <button className="bg-green-300 text-green-800 font-bold py-2 px-6 mx-6 mt-3 rounded"> 
                    Opprett oppgjør i Vipps
                </button>

                <button className="bg-green-800  text-white font-bold py-2 px-4 mx-6 mt-3 rounded">Se billetttene</button>
                
            </div>
        }

        return (
            <div className="bg-white flex">
                
                <div className="flex-1"></div>
                {content}
                
            </div>
        )
}


};

export default SmsSentConfirmation;