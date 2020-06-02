import React from 'react';

function HeaderBuySingle(props) {
    return (
        <div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
            <p className="font-medium">Kjøp enkeltbillett</p>
            <button onClick={() => {
                props.endTransaction(); 
                props.restartOrder(); 
                props.initTicketTypes()}}>
                <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
            </button>
        </div>
    );
}

export default HeaderBuySingle;