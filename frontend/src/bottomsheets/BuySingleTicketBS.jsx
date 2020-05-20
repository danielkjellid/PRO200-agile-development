import React, { Component } from "react";
//import numberOfTravellers from '../numberOfTravellers';
import EditTravellers from "../bottomsheets/EditTravellers";
import ticketTypes from "../fakeData/ticketTypes";
import routes from "../fakeData/readyRoutes";
import RouteCard from "../components/RouteCard";

class BuySingleTicketBS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editNumberOfTravellers: false,
      numberOfTravellers: ticketTypes,
      routes: routes,
      chooseDestination: true,
      chooseDeparture: false,
      chooseSeat: false,
      choosePayment: false,
      confirmation: false,
      active: null,
    };
  }

  addNumber = (id) => {
    this.setState({ number: this.state.numberOfTravellers[id].number++ });
  };

  removeNumber = (id) => {
    let number = this.state.numberOfTravellers[id].number;
    if (number > 0) {
      this.setState({ number: this.state.numberOfTravellers[id].number-- });
    }
  };

  editTravellersHandler = () => {
    this.setState({ editNumberOfTravellers: true });
  };

  turnToActive = (id) => {
    this.setState({ active: id });
  };

  renderEditNumberOfTravellers = () => {
    if (this.state.editNumberOfTravellers === true) {
      return (
        <div className="editNumberOfTravellersContainer">
          {this.state.numberOfTravellers.map((item, index) => {
            return (
              <EditTravellers
                key={index}
                type={item.type}
                number={item.number}
                add={() => this.addNumber(index)}
                remove={() => this.removeNumber(index)}
              ></EditTravellers>
            );
          })}
          <button onClick={this.hideEditNumberOfTravellers}>Fortsett</button>
        </div>
      );
    }
  };

  hideEditNumberOfTravellers = () => {
    this.setState({ editNumberOfTravellers: false });
  };

  continueToDepartures = () => {
    this.setState({ chooseDestination: false, chooseDeparture: true });
  };

  continueToSeats = () => {
    this.setState({ chooseDeparture: false, chooseSeat: true });
  };

  continueToPayment = () => {
    this.setState({ chooseSeat: false, confirmation: true });
  };

  continueToConfirmation = () => {
    this.setState({ chooseSeat: false, choosePayment: true });
  };

  render() {
    let fortsettButton;
    this.state.active !== null
      ? (fortsettButton = (
          <button
            onClick={this.continueToSeats}
            className="fortsettButton fortsettButtonActive"
          >
            Fortsett til betaling
          </button>
        ))
      : (fortsettButton = (
          <button className="fortsettButton fortsettButtonDisabled">
            Fortsett til betaling
          </button>
        ));

    return (
      <div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
        <div className="">
          <div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
            <p className="font-medium">Kjøp enkeltbillett</p>
            <button onClick={this.props.cancelTransaction}>
              <svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
            </button>
          </div>

          <div
            className={
              this.state.chooseDestination ? "displayBlock" : "displayNone"
            }
          >
            <div>
              <div className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer" onClick={this.props.hideBuySingleTicket}>
              <svg className="h-6 w-6 pr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/></svg>
                <p className="text-sm font-medium">Tilbake til billettvalg</p>
              </div>
              <div className="pl-5 pr-5 pb-5">
                <p className="text-sm font-medium pb-1 text-gray-800">Avreise og destinasjon</p>
                <input className="p-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Avreise" />
                <input className="p-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Destinasjon" />
              </div>
            </div>
            <div className="pr-5 pl-5 pb-5">
              <p className="text-sm font-medium pb-1 text-gray-800">Når vil du reise?</p>
            </div>{" "}
            {/* this section will be developed later */}
            <div className="p-5">
              <button
                onClick={this.continueToDepartures}
                className="p-3 w-full bg-green-800 text-center text-sm font-medium text-white rounded-md"
              >
                Fortsett til avganger og billetter
              </button>
            </div>
          </div>

          <div
            className={
              this.state.chooseDeparture ? "displayBlock" : "displayNone"
            }
          >
            <div>
              <div
                className={
                  this.state.editNumberOfTravellers ? "modalBack" : null
                }
              ></div>
              <div className="numberOfTravellers">
                <div>
                  {this.state.numberOfTravellers.map((item) => {
                    if (item.number > 0) {
                      return (
                        <p key={item.type}>
                          {item.type} : {item.number}
                        </p>
                      );
                    }
                  })}
                </div>
                <button className="button" onClick={this.editTravellersHandler}>
                  Rediger
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <button className="button2">Tog</button>
                  <button className="button3">Buss</button>
                </div>

                {this.state.routes.map((item) => {
                  return (
                    <RouteCard
                      active={this.state.active}
                      click={() => this.turnToActive(item.id)}
                      key={item.id}
                      id={item.id}
                      startStation={item.stationStart}
                      endStation={item.stationEnd}
                      travelTime={item.travelTime}
                      startTime={item.startTime}
                      endTime={item.endTime}
                      track={item.track}
                      numOfStops={item.numberOfStops}
                      price={item.price}
                    ></RouteCard>
                  );
                })}

                {fortsettButton}
              </div>
              {this.renderEditNumberOfTravellers()}
            </div>
          </div>

          <div
            className={this.state.chooseSeat ? "displayBlock" : "displayNone"}
          >

            
            <div>Choose the seat site</div>
            <button
              onClick={this.continueToPayment}
              className="fortsettButton fortsettButtonActive"
            >
              Fortsett til betaling
            </button>
          </div>

          <div
            className={
              this.state.choosePayment ? "displayBlock" : "displayNone"
            }
          >
            <div>Betaling site</div>
            <button
              onClick={this.continueToConfirmation}
              className="fortsettButton fortsettButtonActive"
            >
              Bekreft og betal bestillingen
            </button>
          </div>

          <div
            className={this.state.confirmation ? "displayBlock" : "displayNone"}
          >
            <div>Betaling site</div>
            <button className="fortsettButton">
              Send billetter til venner
            </button>
            <button
              onClick={this.continueToConfirmation}
              className="fortsettButton fortsettButtonActive"
            >
              Se billettene
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BuySingleTicketBS;
