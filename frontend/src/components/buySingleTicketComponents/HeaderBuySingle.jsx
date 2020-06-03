import React from 'react';

function HeaderBuySingle(props) {
    return (
        <div className="flex flex-row items-center justify-between p-5 border-b border-grey-300 mb-5" >
            {!props.confirmation ? 
            <React.Fragment>
                <svg className="text-gray-700 w-5 h-5" onClick={props.back} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
                <p className="font-medium">Kjøp enkeltbillett</p>
            </React.Fragment>
            : null}
            <button onClick={() => {
                props.endTransaction(); 
                props.restartOrder(); 
                props.initTicketTypes()}}>
                <svg className="float-right h-5 w-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
            </button>
        </div>
    );
}

export default HeaderBuySingle;