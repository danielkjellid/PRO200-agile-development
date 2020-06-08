// framework imports
import React from 'react';


function HeaderSendTickets(props) {
    return (
        <div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
            {/* conditionally show a back button based on view */}
            <button style={props.contactListShow || props.makeAccountInVIpps ? { display: "block" } : { display: "none" }} onClick={props.back}>
                <svg className="cursor-pointer text-gray-700 w-5 h-5" onClick={props.back} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
            </button>
            <p className="font-medium">Send billetter</p>
            <div></div>
        </div>
    );
}

export default HeaderSendTickets;

