// framework imports
import React from 'react';

function TicketItemEditModal(props) {
   
    return (
        props.show ? 
        <React.Fragment>
            <div className="w-full h-full z-10 block fixed bottom-0 right-0 bg-black opacity-25"></div>
            <div className="z-30 mx-5 absolute bottom-0 right-0 left-0">
                <div className="bg-white rounded-md mb-3 p-6 shadow-xl w-full">
                    <div className="text-center">
                        <h2 className="text-lg font-medium mb-2">Rediger navn på reise</h2>
                        <p className="text-sm text-gray-700 mb-6">
                            Her kan du navngi reisen din. Navnendringen er synlig for alle medreisende.
                        </p>
                    </div>
                    <input
                        className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700"
                        placeholder="Hva vil du kalle reisen?"
                        value={props.name}
                        onChange={props.handleNameChange}
                    />
                </div>
                <button
                    className="shadow-xl p-3 w-full bg-white text-center text-sm font-medium text-black rounded-md hover:cursor mb-6"
                    onClick={props.acceptChange}
                >Bekreft
                </button>
            </div>
        </React.Fragment>
        : null
    )

}

export default TicketItemEditModal;