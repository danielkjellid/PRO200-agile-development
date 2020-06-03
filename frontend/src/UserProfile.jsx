

import React, { Component } from "react";
import ChooseTicketBS from "./bottomsheets/ChooseTicketBS";
import BuySingleTicketBS from "./bottomsheets/BuySingleTicketBS";
import SendTicketBS from "./bottomsheets/SendTicketsBS";
import ActiveTickets from "./components/ActiveTickets";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //I create fake user data for now
      name: '',
      contactList: [],
      chooseTicket: false,
      singleTicket: false,
      periodTicket: false,
      sendTicketShow: false,
      activeTicket: true,
    };

    this.newTicketButtonHandler = this.newTicketButtonHandler.bind(this);
  }

  newTicketButtonHandler = () => {
    const newTicketShow = this.state.chooseTicket;
    
    if (newTicketShow) {
      this.setState({ chooseTicket: false });
      this.props.endTransaction();
    } else {
      this.setState({ chooseTicket: true });
      this.props.fadeBackground();
    }
  };

  buySingleTicketButtonHandler = () => {
    const buySingleTicketShow = this.state.singleTicket;
    this.setState({ singleTicket: !buySingleTicketShow });
    this.newTicketButtonHandler();
    this.props.fadeBackground();
  };

  renderChooseTicket = () => {
    if (this.state.chooseTicket) {
      return (
          <ChooseTicketBS
            click={this.buySingleTicketButtonHandler}
            clickX={this.newTicketButtonHandler}
          />
      );
    }
  };

  renderBuySingleTicket = () => {
    if (this.state.singleTicket) {
      return (
          <BuySingleTicketBS
            endTransaction={this.endTransaction}
            hideBuySingleTicket={this.hideBuySingleTicket}
            renderSendTicket={this.sendTicketsHandler}
          />
      );
    }
  };

  sendTicketsHandler = () => {
    this.setState({ sendTicketShow: true });
    this.setState({ singleTicket: false });
  };

  renderSendTicket = () => {
    let contactList;
    if(this.state.contactList){contactList = this.state.contactList}
    if (this.state.sendTicketShow) {
      return (
          <SendTicketBS
            updateContactList={this.props.updateContactList}
            contactList={this.props.contactList}
            endTransaction={this.props.endTransaction}
            endSendingTickets={this.endSendingTickets}
          />
      );
    }
  };

  hideBuySingleTicket = () => {
    this.endTransaction();
    this.newTicketButtonHandler();
    
  };

  endTransaction = () => {
    this.setState({ singleTicket: false });
    this.props.endTransaction();
  };

  endSendingTickets = () => {
    this.setState({ sendTicketShow: false });
    this.props.endTransaction();
  }

  render() {
    let userName = this.props.user;
    let userNameDisplay = userName ? userName[0].firstName : "kunde";

    const date = new Date()
    const hours = date.getHours()
    let timeOfDay
    const timeOfDayStyle = {
      fontSize: 30
    }

    if (hours < 12) {
      timeOfDay = "morgen"
    } else if (hours >= 12 && hours < 17) {
      timeOfDay = "ettermiddag"
    } else {
      timeOfDay = "kveld"
    }

    return (
      <div>
        {this.renderChooseTicket()}
        {this.renderBuySingleTicket()}
        {this.renderSendTicket()}

        {/* user profile headder */}
        {/* containing info about user, account and button to purchase new ticket */}
        <div className="bg-white shadow">
          <div className="px-5 py-5">
            <div className="border-b border-gray-300">
              <div className="flex items-center pb-4">
                <div className="h-16 w-16 rounded-full bg-red-400">
                  {/* img TBA */}
                </div>
                <div className="ml-5">

                  <h1 className="font-bold text-2xl text-gray-800">
                    God {timeOfDay}, {userNameDisplay}
                  </h1>
                  <div className="flex items-center">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="text-green-400 h-5 w-5"
                    >
                      <path
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    <span className="ml-1 mb-px font-medium text-gray-700 text-sm">
                      Verifisert konto
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <button
                onClick={this.newTicketButtonHandler}
                className="bg-vy-green-300 text-white text-sm font-medium rounded-lg px-4 py-3 w-full hover:bg-vy-green-400"
              >
                Ny billett
              </button>
            </div>
          </div>
          <ActiveTickets /> 
        </div>

       
      </div>  
    );
  }
}

export default UserProfile;
