import React, { Component } from 'react';
//import numberOfTravellers from '../numberOfTravellers';
import EditTravellers from '../bottomsheets/EditTravellers';
import ticketTypes from '../fakeData/ticketTypes';


import Seats from '../components/Seats';
import ChooseDestination from '../components/buySingleTicketComponents/ChooseDestination';
import ChooseDeparture from '../components/buySingleTicketComponents/ChooseDeparture';

class BuySingleTicketBS extends Component {
	constructor(props) {
		super(props);


		this.state = {
			editNumberOfTravellers: false,
			numberOfTravellers: ticketTypes,
			chooseDestination: true,
			chooseDeparture: false,
			chooseSeat: false,
			choosePayment: false,
			confirmation: false,
		};
	}

	//////////////////////////////////////////////////////////////////////////////
	// functions to handle number and types of the tickests 
	//////////////////////////////////////////////////////////////////////////////

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

	hideEditNumberOfTravellers = () => {
		this.setState({ editNumberOfTravellers: false });
	};





	//////////////////////////////////////////////////////////////////////////////
	// functions to render different modals depending on the state
	//////////////////////////////////////////////////////////////////////////////

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
				</div>);}
	};

	renderChooseDestination = () => {
		return(
			<ChooseDestination 
				chooseDestination={this.state.chooseDestination}
				hideBuySingleTicket={this.props.hideBuySingleTicket}
				continueToDepartures={this.continueToDepartures}
				editTravellersHandler={this.editTravellersHandler}
				
				renderEditNumberOfTravellers={this.renderEditNumberOfTravellers}
				continueToSeats={this.continueToSeats}
				
			></ChooseDestination>
		)
	}

	renderChooseDeparture = () => {
		return(
			<ChooseDeparture
				chooseDeparture={this.state.chooseDeparture}
				editNumberOfTravellers={this.state.editNumberOfTravellers}
				numberOfTravellers={this.state.numberOfTravellers}
			></ChooseDeparture>
		)
	}

	renderChooseSeats = () => {
		if (this.state.chooseSeat === true) {
			return (
				<div>
					<Seats />
				</div>
			);
		}
	};

	

	//////////////////////////////////////////////////////////////////////////////
	// functions to active different modals depend on which one is 'true' in state
	//////////////////////////////////////////////////////////////////////////////
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
		

		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
				<div className="">
					{/* header of the BuySingleTicket bottom sheet */}
					<div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
						<p className="font-medium">Kjøp enkeltbillett</p>
						<button onClick={this.props.endTransaction}>
						<svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
						</button>
					</div>


				{this.renderChooseDestination()}	
				{this.renderChooseDeparture()}
				{this.renderEditNumberOfTravellers()}
          
					

					<div
						className={this.state.chooseSeat ? 'displayBlock' : 'displayNone'}
					>
						<div>Choose the seat site{this.renderChooseSeats()}</div>
						<button
							onClick={this.continueToPayment}
							className="fortsettButton fortsettButtonActive"
						>
							Fortsett til betaling
						</button>
					</div>

					<div
						className={
							this.state.choosePayment ? 'displayBlock' : 'displayNone'
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
						className={this.state.confirmation ? 'displayBlock' : 'displayNone'}
					>
						<div>Send videre</div>
						<button onClick={this.props.renderSendTicket} className="fortsettButton fortsettButtonActive">
							Send billetter til venner
						</button>
						<button
							
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
