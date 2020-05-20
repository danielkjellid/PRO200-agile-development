import React, { Component } from "react";
import boughtTickets from "../fakeData/boughtTicket";
import Contact from "../components/Contact";

class SendTicketBS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewTicketsShow: true,
      contactListShow: false,
      sentTicketsConfirmationShow: false,
      boughtTickets: boughtTickets,
      renderButtonText: ["Send billetter", "Fortsett"],
    };
  }

  pickContact = (id) => {
    this.setState({
      reviewTicketsShow: false,
      contactListShow: true,
    });
  };

  openContactList = () => {
    if (this.state.contactListShow) {
      return (
        <React.Fragment>
          <div>
            <p>Tilbake til billettoversikt</p>
            <button>Kontakter</button>
            <button>Grupper</button>
            <input placeholder="Søk" />
            <Contact></Contact>
          </div>
        </React.Fragment>
      );
    }
  };

  backToSendTickets = () => {
    this.setState({ reviewTicketsShow: true, contactListShow: false });
  };

  renderButton = () => {
    let buttonClassNameToggle;

    if (this.state.reviewTicketsShow) {
      buttonClassNameToggle = "fortsettButton fortsettButtonDisabled";
      return (
        <button className={buttonClassNameToggle}>
          {this.state.renderButtonText[0]}
        </button>
      );
    }
    if (this.state.contactListShow) {
      buttonClassNameToggle = "fortsettButton fortsettButtonActive";
      return (
        <button
          onClick={this.backToSendTickets}
          className={buttonClassNameToggle}
        >
          {this.state.renderButtonText[1]}
        </button>
      );
    }
  };

  reviewTicket = () => {
    if (this.state.reviewTicketsShow) {
      return (
        <React.Fragment>
          <div>
            {this.state.boughtTickets.map((item) => {
              return (
                <div>
                  {item.ticket}
                  <div
                    onClick={() => {
                      this.pickContact(item.id);
                    }}
                  >
                    {item.activeTicket}
                    {item.passiveTicket}
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="modalSendTickets">
        <p>Send billetter ja</p>
        <button>x</button>
        {this.reviewTicket()}
        {this.openContactList()}
        {this.renderButton()}
      </div>
    );
  }
}

export default SendTicketBS;
