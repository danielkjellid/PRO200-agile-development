import React from 'react';

function ChooseTicketBS(props) {
    return (
        <div>
            <div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md rounded-b-lg modal modal-footer">
                <div className="flex justify-between p-5 border-b border-grey-300 mb-5">
                    <div></div>
                    <h4 className="font-medium">Velg billett</h4>
                    <button onClick={props.clickX}>
                        <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
                    </button>
                </div>
                <div className="px-5 pb-5">
                    <button className="p-8 w-full border border-gray-300 rounded-md font-medium text-gray-700" id="single" onClick={props.click}>Enkeltbillett</button>
                </div>
                <div className="flex flex-row justify-between pr-5 pl-5 pb-5">
                    <button className="p-8 border border-gray-300 rounded-md font-medium text-gray-700" id="period">Periodebillett</button>
                    <button className="p-8 border border-gray-300 rounded-md font-medium text-gray-700" id="period">Ekstra soner</button>
                </div>
                
            </div>
        </div>
    );
}



export default ChooseTicketBS;