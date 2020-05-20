import React, { Component } from 'react';
import boughtTickets from "../fakeData/boughtTicket";

class sendTicketBS extends Component {
    constructor(props) {
        super(props)

        this.state = {
            reviewTicketsShow: true,
            contactListShow: false,
            sentTicketsConfirmationShow: false,
            boughtTickets: boughtTickets,
            renderButtonText: "Send billetter"
        }
    }

    pickContact = (id) => {
        openContactList();
        this.setState({
            reviewTicketsShow: false,
            contactListShow: true
        })
    }

    openContactList = () => {
        if (this.state.contactListShow) {
            return(
            <div>
                <p>Tilbake til billettoversikt</p>
                <button>Kontakter</button>
                <button>Grupper</button>
                <input placeholder="Søk"/>
            </div>
            )
        }
    }

    reviewTicket = () => {
        if (this.state.reviewTicketsShow) {
            return(
                <React.Fragment>
                    <div>
                        {this.state.boughtTickets.map(item => {
                            return(
                            <div>
                                {item.ticket}
                                <div onClick={() => {this.pickContact(item.id)}}>
                                {item.activeTicket} 
                                {item.passiveTicket}
                                </div>
                                
                            </div>)
                            })}
                    </div>
                </React.Fragment>
            )
        }
        
    }
    

    render() {

        return(
            <div className="modalSendTickets">
                <p>Send billetter</p>
                <button>x</button>
                {this.reviewTicket()}
                <button className="fortsettButton fortsettButtonDisabled">{this.state.renderButtonText}</button>
            </div>
        )
    }


}

export default sendTicketBS;