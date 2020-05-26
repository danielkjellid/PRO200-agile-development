import React, { Component } from "react";
import Contact from "../Contact";

class ContactListSendTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let passiveTicketArr;
    let content;

    if (this.props.contactListShow) {
      content = (
        <div>
          <p>Tilbake til billettoversikt</p>
          <button>Kontakter</button>
          <button>Grupper</button>
          <input placeholder="Søk" />

          {this.props.contactList.map((item) => {
            return (
              <Contact
                name={item.firstName}
                lastName={item.lastName}
                phone={item.phoneNumber}
              ></Contact>
            );
          })}
        </div>
      );
    }

    return { content };
  }
}

export default ContactListSendTicket;