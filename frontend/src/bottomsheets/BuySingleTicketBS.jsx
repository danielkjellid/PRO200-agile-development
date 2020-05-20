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
      <div className="modalContainer">
        <div className="modalContent">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>Kjøp enkeltbillett</p>
            <button onClick={this.props.cancelTransaction}>X</button>
          </div>

          <div
            className={
              this.state.chooseDestination ? "displayBlock" : "displayNone"
            }
          >
            <div>
              <p onClick={this.props.hideBuySingleTicket}>
                Tilbake til billettvalg
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "90%",
                }}
              >
                <p>Avreise og destinasjon</p>
                <input className="input" placeholder="Avreise" />
                <input className="input" placeholder="Destinasjon" />
              </div>
            </div>
            <div>Når vil du reise?</div>{" "}
            {/* this section will be developed later */}
            <button
              onClick={this.continueToDepartures}
              className="fortsettButton fortsettButtonActive"
            >
              Fortsett til avganger og billetter
            </button>
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
