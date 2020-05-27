import React, { Component } from 'react';
class TicketsWereSend extends Component {

    render() {
        let inhold;
        if(this.props.ticketsWereSent){
            inhold =  (<div>Billetene ble sendt komponent</div>)
        }

        return (
            <div>
                {inhold}
            </div>
        );
    }
}

export default TicketsWereSend;