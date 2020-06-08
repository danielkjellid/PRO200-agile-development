import React from 'react';

function ActiveTicketDetails(props) {

    return (
        <div>
            <div onClick={props.click}>Tilbake til billettoversikt</div>
            <div>Ticket details</div>
        </div>
    );
}


export default ActiveTicketDetails;