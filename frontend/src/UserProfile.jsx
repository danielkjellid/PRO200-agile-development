// e8007e4db60528762be401e35489e959
// Add this as a X-TripGo-Key header to your API calls to authenticate.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import ChooseTicketBS from "./bottomsheets/ChooseTicketBS";
import BuySingleTicketBS from "./bottomsheets/BuySingleTicketBS";
import ActiveTickets from "./components/ActiveTickets";
import SendTicketBS from "./bottomsheets/sendTicketsBS";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //I create fake user data for now
      user: {
        name: "Jonathan Swallow",
        singleTicket: true,
      },
      chooseTicket: false,
      singleTicket: false,
      periodTicket: false,
      sendTicketShow: false,
    };
  }

  newTicketButtonHandler = () => {
    const newTicketShow = this.state.chooseTicket;

    if (newTicketShow) {
      this.setState({ chooseTicket: false });
      this.props.cancelTransaction();
    } else {
      this.setState({ chooseTicket: true });
      this.props.startTransaction();
    }
  };

  buySingleTicketButtonHandler = () => {
    const buySingleTicketShow = this.state.singleTicket;
    this.setState({ singleTicket: !buySingleTicketShow });
    this.newTicketButtonHandler();
    this.props.startTransaction();
  };

  renderChooseTicket = () => {
    if (this.state.chooseTicket) {
      return (
        <React.Fragment>
          <ChooseTicketBS
            click={this.buySingleTicketButtonHandler}
            clickX={this.newTicketButtonHandler}
          ></ChooseTicketBS>
        </React.Fragment>
      );
    }
  };

  showSendTickets = () => {
    this.setState({ singleTicket: false, sendTicketShow: true });
  };

  renderBuySingleTicket = () => {
    if (this.state.singleTicket === true) {
      return (
        <React.Fragment>
          <BuySingleTicketBS
            sendTicketShow={this.showSendTickets}
            cancelTransaction={this.cancelTransaction}
            hideBuySingleTicket={this.hideBuySingleTicket}
          ></BuySingleTicketBS>
        </React.Fragment>
      );
    }
  };

  renderSendTicket = () => {
    if (this.state.sendTicketShow) {
      return (
        <React.Fragment>
          <SendTicketBS showSendTickets={this.showSendTickets}></SendTicketBS>
        </React.Fragment>
      );
    }
  };

  hideBuySingleTicket = () => {
    this.setState({ singleTicket: false });
    this.newTicketButtonHandler();
    this.props.cancelTransaction();
  };

  cancelTransaction = () => {
    this.setState({ singleTicket: false });
    this.props.cancelTransaction();
  };

  render() {
    return (
      <div>
        {this.renderChooseTicket()}
        {this.renderBuySingleTicket()}
        {this.renderSendTicket()}

        <div className="container">
          <div className="welcome">
            <div className="profileImage">Image</div>
            <h2>Hei, {this.state.user.name}</h2>
          </div>

          <button
            className="styleNewTicketButton"
            onClick={this.newTicketButtonHandler}
          >
            Ny billett
          </button>

          <div className="section">
            <div className="header">
              <h3 className="text-orange-600">Billetter</h3>
              <Link to={"/tickets"}>Se alle billetter</Link>
            </div>

            <div className="acticeTikcetContainer">
              <ActiveTickets
                singleTicket={this.state.user.singleTicket}
                periodTicket={this.state.periodTicket}
              />
            </div>
          </div>
          <div className="section">
            <div className="header">
              <h3>Miljøkalkulator</h3>
            </div>
            <div className="acticeTikcetContainer">Miljø greier</div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
