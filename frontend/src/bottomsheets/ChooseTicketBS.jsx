import React, { Component } from 'react';

class ChooseTicketBS extends Component {
    render() {
        return (
            <div>
                <h4>Velg billett</h4>
                <button id="single" onClick={this.props.click}>Enkeltbillett</button>
                <button id="period">Periodebillett</button>
                <p>Ekstra soner</p>
                <p>Kjøp til andre</p>
            </div>
        );
    }
}

export default ChooseTicketBS;