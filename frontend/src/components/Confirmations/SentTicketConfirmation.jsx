// framework imports
import React from 'react';


// confirmation message after tickets were sent
function SentTicketConfirmation(props) {

    let content;

    if(props.ticketsWereSent){
        content =  (
            <div className="text-center px-12 mb-6">
                <p className="text-xl font-medium mb-6">Billettene ble sendt</p>
                <p className="text-sm text-gray-600 font-base mb-6">Takk for at du bruker Vy sitt nye billettdelingssystem!</p>
                <div className="flex flex-row justify-center">
                    <div className="rounded-full bg-gray-400 w-10 h-10" />
                    <div className="rounded-full bg-gray-500 w-10 h-10 -ml-4" />
                    <div className="rounded-full bg-gray-600 w-10 h-10 -ml-4" />
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

export default SentTicketConfirmation;