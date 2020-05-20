// e8007e4db60528762be401e35489e959
// Add this as a X-TripGo-Key header to your API calls to authenticate.

import React, { Component } from "react";
import { Link } from "react-router-dom";
import ChooseTicketBS from "./bottomsheets/ChooseTicketBS";
import BuySingleTicketBS from "./bottomsheets/BuySingleTicketBS";
import ActiveTicket from "./components/ActiveTicket";
import SendTicketBS from "./bottomsheets/sendTicketsBS";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //I create fake user data for now
      user: {
        name: "Per",
        singleTicket: true,
      },
      chooseTicket: false,
      singleTicket: false,
      periodTicket: false,
      sendTicketShow: true,
      activeTicket: true,
      activeTicketDetails: {
        type: "Enkeltbillett",
        group: "Student",
        sharedTicket: true,
        sharedWith: {
          id: 7,
          firstname: "Anne Siri",
          lastname: "Bjørnson",
          mobile: 45212345,
        },
        zone: 1,
        expires: new Date("May 21, 2020, 12:00:00"),
        price: 199,
      },
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

  renderBuySingleTicket = () => {
    if (this.state.singleTicket === true) {
      return (
        <React.Fragment>
          <BuySingleTicketBS
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
          <SendTicketBS></SendTicketBS>
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
                    God morgen, {this.state.user.name}
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
            <div class="pt-4">
              <button
                onClick={this.newTicketButtonHandler}
                className="bg-vy-green-700 text-white text-sm font-medium rounded-lg px-4 py-3 w-full hover:bg-vy-green-900"
              >
                Ny billett
              </button>
            </div>
          </div>
        </div>

        {/* page content */}
        {/* contains info about active ticket, environment calc and ticket stas */}
        <div className="px-5 py-10">
          {/* section */}
          <div>
            {/* section header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg text-gray-900">Billetter</h2>
              <Link to={"/tickets"}>
                <div className="text-sm text-gray-900 flex items-center">
                  Se alle
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="h-5 w-5 text-gray-600"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            </div>
            {/* section content */}
            <ActiveTicket
              activeTicket={this.state.activeTicket}
              ticket={this.state.activeTicketDetails}
            ></ActiveTicket>
          </div>

          {/* section */}
          <div className="mt-12">
            {/* section header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg text-gray-900">Miljøkalkulator</h2>
              <div class="inline-block relative w-40">
                <select class="block appearance-none w-full bg-white hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight text-sm focus:outline-none focus:shadow-outline">
                  <option>Siste 30 dager</option>
                  <option>Siste 60 dager</option>
                  <option>Siste 120 dager</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* section content */}
            <div>
              <div className="bg-white shadow rounded-md">
                <div className="border-b border-gray-300 px-5 py-5">
                  <span className="text-gray-600 font-medium text-sm">CO2</span>
                  <p className="text-gray-900 text-xl">54,02 kg</p>
                </div>
                <div className="border-b border-gray-300 px-5 py-5">
                  <span className="text-gray-600 font-medium text-sm">
                    Bensin
                  </span>
                  <p className="text-gray-900 text-xl">48,34 l</p>
                </div>
                <div className="border-b border-gray-300 px-5 py-5">
                  <span className="text-gray-600 font-medium text-sm">
                    Timer
                  </span>
                  <p className="text-gray-900 text-xl">17 t</p>
                </div>
                <div className="border-b border-gray-300 px-5 py-5">
                  <span className="text-gray-600 font-medium text-sm">
                    Antall kilometer reist
                  </span>
                  <p className="text-gray-900 text-xl">380 km</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
