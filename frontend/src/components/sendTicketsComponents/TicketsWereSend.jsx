import React, { Component } from 'react';
class TicketsWereSend extends Component {

    render() {
        let content;
        if(this.props.ticketsWereSent){
            content =  (
             <div className="text-center px-12 mb-6">
                 <p className="text-xl font-medium mb-6">Billettene ble sendt</p>
                 <p className="text-sm text-gray-600 font-base mb-6">Takk for at du bruker Vy sitt nye billettdelingssystem!</p>
                 <div className="flex flex-row justify-center">
                    <div className="rounded-full bg-gray-400 w-10 h-10"></div>
                    <div className="rounded-full bg-gray-500 w-10 h-10 -ml-4"></div>
                    <div className="rounded-full bg-gray-600 w-10 h-10 -ml-4"></div>
                 </div>
             </div>
            )
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default TicketsWereSend;