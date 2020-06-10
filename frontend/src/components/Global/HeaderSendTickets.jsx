// framework imports
import React from 'react';


// component to control header state and actions during the send ticket process
function HeaderSendTickets(props) {
    return (
        <div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
            {/* conditionally show a back button based on view */}
            <button onClick={props.back}>
                {props.returnArrowOrXBtn()}
            </button>
            <p className="font-medium">Send billetter</p>
            <div></div>
        </div>
    );
}

export default HeaderSendTickets;

