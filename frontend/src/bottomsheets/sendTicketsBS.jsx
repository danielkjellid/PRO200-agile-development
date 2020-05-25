import React, { Component } from "react";
import boughtTickets from "../fakeData/boughtTicket";
import Contact from "../components/Contact";
import HeaderSendTickets from "../components/sendTicketsComponents/HeaderSendTickets";

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
            
            {this.props.contactList.map((item)=> {
              return(<Contact name={item.firstName} lastName={item.lastName} phone={item.phoneNumber}></Contact>)
            })}
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
    console.log(this.props.contactList);
    return (
      <div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
        <div className="">
          <HeaderSendTickets end={this.props.endSendingTickets}>
          </HeaderSendTickets>
   
          {this.reviewTicket()}
          {this.openContactList()}
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default SendTicketBS;
