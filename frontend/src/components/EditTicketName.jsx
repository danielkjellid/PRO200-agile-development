import React from 'react';

function EditTicketName(props) {

   
    return(
        props.show ? 
        <React.Fragment>
                <div className="w-full h-full z-10 block fixed bottom-0 bg-black opacity-25"></div>
                <div className="z-30 mx-5 absolute bottom-0 w-auto">
                    <div className="bg-white rounded-md mb-3 p-6 text-center shadow-xl">
                        <h2 className="text-lg font-medium mb-2">Rediger navn</h2>
                        <input className="text-sm text-gray-700" onChange={props.handleNameChange} value={props.name}/>
                    </div>
                    <button
                        className="shadow-xl p-3 w-full bg-white text-center text-sm font-medium text-black rounded-md hover:cursor mb-6"
                        onClick={props.acceptChange}
                    >
                        Ok
                    </button>
                </div>
            </React.Fragment>
        : null
    )

}

export default EditTicketName;