import React, { Component } from 'react';

class ChooseTicketBS extends Component {
    render() {

        return (
            <div>
                <div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md rounded-b-lg modal">
                    <div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
                        <h4 className="font-medium">Velg billett</h4>
                        <button onClick={this.props.clickX}>
                            <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
                        </button>
                    </div>
                    <div className="flex flex-row justify-between pr-5 pl-5 pb-5">
                        <button className="p-8 border border-gray-300 rounded-md font-medium text-gray-700" id="single" onClick={this.props.click}>Enkeltbillett</button>
                        <button className="p-8 border border-gray-300 rounded-md font-medium text-gray-700" id="period">Periodebillett</button>
                    </div>
                    <div className="pl-5 pr-5 pb-24">
                        <div className="pb-5 border-b border-grey-300">
                            <p className="font-medium text-sm text-gray-700">Ekstra soner</p>
                            <p className="font-normal text-gray-600 text-xs">Kjøp billett til andre soner</p>
                        </div>
                        <div className="pt-5">
                            <p className="font-medium text-sm text-gray-700">Kjøp til andre</p>
                            <p className="font-normal text-gray-600 text-xs">Send billetten til en annen telefon</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChooseTicketBS;