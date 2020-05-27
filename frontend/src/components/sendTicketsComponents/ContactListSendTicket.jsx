import React, { Component } from "react";
import Contact from "../Contact";

class ContactListSendTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenTicketHoldersId:''
    };
  }


  getChosenTicketHoldersId = (array) => {
    this.setState({chosenTicketHoldersId: array})
  }

  

  render() {
    let passiveTicketArr;
    let content;

    if (this.props.contactListShow) {
      passiveTicketArr =  this.props.passiveTickets;
      console.log(this.props.contactList);
      content = (
        <div>
          <p>Tilbake til billettoversikt</p>
          <button>Kontakter</button>
          <button>Grupper</button>
          <input placeholder="Søk" />

          {this.props.contactList.map((item, index) => {
            return (
              <Contact
                addToActives={this.props.addToActives}
                removeFromActives={this.props.removeFromActives}
                key={index}
                id={item.id}
                name={item.firstName}
                lastName={item.lastName}
                phone={item.phoneNumber}
    
              ></Contact>
            );
          })}
        </div>
      );
    }

    return(
        <div>{ content }</div>
    ) 
  }
}

export default ContactListSendTicket;