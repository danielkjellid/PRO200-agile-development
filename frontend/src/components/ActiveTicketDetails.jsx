import React, { Component } from 'react';
class ActiveTicketDetails extends Component {
   
    render() {
        return (
            <div>
                <div onClick={this.props.click}>Tilbake til billettoversikt</div>
                <div>Ticket details</div>
            </div>
        );
    }
}

export default ActiveTicketDetails;