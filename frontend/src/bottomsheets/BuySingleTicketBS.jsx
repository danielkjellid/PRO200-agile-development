import React, { Component } from 'react';
import HeaderBuySingle from '../components/buySingleTicketComponents/HeaderBuySingle';
import EditTravellers from '../bottomsheets/EditTravellers';
import ChooseDestination from '../components/buySingleTicketComponents/ChooseDestination';
import ChooseDeparture from '../components/buySingleTicketComponents/ChooseDeparture';
import ChooseSeats from '../components/buySingleTicketComponents/ChooseSeats';
import ChoosePayment from '../components/buySingleTicketComponents/ChoosePayment';
import Confirmation from '../components/buySingleTicketComponents/Confirmation';

class BuySingleTicketBS extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chooseTicketType: false,
			ticketTypeNum: [],
			startPoint: '',
			endPoint: '',
			chooseDestination: true,
			chooseDeparture: false,
			chooseSeat: false,
			choosePayment: false,
			confirmation: false,
			order: { name: '' },
			tickets: null,
		};
	}

	/////////////////////////////////////////////////////////////////////////////////////////////
	// functions that deal with order data, that will be parsed to API after transaction is over
	//////////////////////////////////////////////////////////////////////////////////////////////

	componentDidMount() {
		this.initTicketTypes();
	}

	//this function initialize all the ticket types with default Voksen: 1
	initTicketTypes = () => {
		const editTravellers = [
			{ type: 'Voksen', number: 1 },
			{ type: 'Barn (6-17 år)', number: 0 },
			{ type: 'Ungdom (18-19 år)', number: 0 },
			{ type: 'Student', number: 0 },
			{ type: 'Honnør', number: 0 },
		];
		this.setState({ ticketTypeNum: editTravellers });
	};

	//this function creates array of objects(tickets) that are furthermore posted in API
	createTicketInOrder = () => {
		let ticketsPrint = [];
		let ticketsChosen = this.state.ticketTypeNum;
		for (let i = 0; i < ticketsChosen.length; i++) {
			if (ticketsChosen[i].number > 0) {
				let count = ticketsChosen[i].number;
				while (count > 0) {
					ticketsPrint.push({
						type: ticketsChosen[i].type,
						startPoint: this.state.startPoint,
						endPoint: this.state.endPoint,
						referenceCode: '2xdfe',
						seat: '14b',
						price: 0,
					});
					count--;
				}
			} else {
				continue;
			}
		}
		this.setState({ tickets: ticketsPrint });
	};

	restartOrder = () => {
		this.setState({ order: { name: '' } });
	};

	//this function sets a name for the order by default its the date order was executed
	setUniqueOrderName = () => {
		this.restartOrder();
		let name;
		let date = new Date();
		const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec',];
		name = `${date.getFullYear()}-${
			months[date.getMonth()]
		}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		this.setState({ order: { name: name } });
	};

	setStartPoint = (value) => {
		this.setState({ startPoint: value });
	};

	setEndPoint = (value) => {
		this.setState({ endPoint: value });
		
	};

	//////////////////////////////////////////////////////////////////////////////
	// functions to handle number and types of the tickests
	//////////////////////////////////////////////////////////////////////////////

	addNumber = (id) => {
		this.setState({ number: this.state.ticketTypeNum[id].number++ });
	};

	removeNumber = (id) => {
		let number = this.state.ticketTypeNum[id].number;
		if (number > 0) {
			this.setState({ number: this.state.ticketTypeNum[id].number-- });
		}
	};

	editTravellersHandler = () => {
		this.setState({ chooseTicketType: true });
	};

	hideEditNumberOfTravellers = () => {
		this.setState({ chooseTicketType: false });
	};

	//////////////////////////////////////////////////////////////////////////////
	// functions to render different modals depending on the state
	//////////////////////////////////////////////////////////////////////////////

	renderEditNumberOfTravellers = () => {
		if (this.state.chooseTicketType) {
			return (
				<div className="m-5">
					<div className="mb-2 bg-white rounded-lg z-10 block relative px-5 pb-5">
						{this.state.ticketTypeNum.map((item, index) => {
							return (
								<EditTravellers
									key={index}
									type={item.type}
									number={item.number}
									add={() => this.addNumber(index)}
									remove={() => this.removeNumber(index)}
								/>
							);
						})}
					</div>
					<div>
						<button
							onClick={this.hideEditNumberOfTravellers}
							className="relative z-10 p-3 w-full bg-white text-center text-sm font-medium text-gray-900 rounded-md hover:bg-gray-100"
						>
							Fortsett
						</button>
					</div>
				</div>
			);
		}
	};

	//////////////////////////////////////////////////////////////////////////////
	// updating API
	//////////////////////////////////////////////////////////////////////////////

	submitNewOrder = async () => {
		const url = 'https://localhost:5001/orders';
		const payload = this.state.order;
		
		try {
			await fetch(url, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.log(err);
		}
		this.getLastOrderID();
	};

	getLastOrderID = async () => {
		let data;
		try {
			const response = await fetch('https://localhost:5001/orders', {
				method: 'get',
			});
			data = await response.json();
		} catch (err) {}

		if (data) {
			let id = data[data.length - 1].id;
			this.submitTickets(id);
		}
	};

	submitTickets = async (id) => {
		const url = `https://localhost:5001/orders/${id}/basictickets`;
		const payload = this.state.tickets;

		try {
			await fetch(url, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.log(err);
		}
	};

	///////////////////////////////////////////////////////////////////////////////////
	// functions to trigger different modals, depending on which one is 'true' in state
	///////////////////////////////////////////////////////////////////////////////////
	continueToDepartures = () => {
		let chooseDeparture = this.state.chooseDeparture
		let chooseDestination = this.state.chooseDestination
		this.setState({ chooseDestination: !chooseDestination, chooseDeparture: !chooseDeparture });
		this.setUniqueOrderName();
	};

	continueToSeats = () => {
		let chooseDeparture = this.state.chooseDeparture
		let chooseSeat = this.state.chooseSeat
		this.setState({ chooseDeparture: !chooseDeparture, chooseSeat: !chooseSeat });
	};

	continueToPayment = () => {
		let chooseSeat = this.state.chooseSeat
		let choosePayment = this.state.choosePayment
		this.setState({ chooseSeat: !chooseSeat, choosePayment: !choosePayment });
	};

	continueToConfirmation = () => {
		let choosePayment = this.state.choosePayment
		let confirmation = this.state.confirmation
		this.setState({ choosePayment: !choosePayment, confirmation: !confirmation });
	};

	continueToSeatsHandler = () => {
		this.continueToSeats();
		this.createTicketInOrder();
	};

	render() {
		if(this.state.endPoint){console.log(this.state.endPoint)}
		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
				<div className="">
					<HeaderBuySingle
						endTransaction={this.props.endTransaction}
						restartOrder={this.restartOrder}
						initTicketTypes={this.initTicketTypes}
					/>

					<ChooseDestination
						startPoint={this.state.startPoint}
						endPoint={this.state.endPoint}
						chooseDestination={this.state.chooseDestination}
						hideBuySingleTicket={this.props.hideBuySingleTicket}
						continueToDepartures={this.continueToDepartures}
						setStartPoint={this.setStartPoint}
						setEndPoint={this.setEndPoint}
					/>

					<ChooseDeparture
						chooseDeparture={this.state.chooseDeparture}
						editNumberOfTravellers={this.state.chooseTicketType}
						numberOfTravellers={this.state.ticketTypeNum}
						editTravellersHandler={this.editTravellersHandler}
						renderEditNumberOfTravellers={this.renderEditNumberOfTravellers}
						continueToSeats={this.continueToSeatsHandler}
						startPoint={this.state.startPoint}
						endPoint={this.state.endPoint}
						back={this.continueToDepartures}
					/>

					{this.renderEditNumberOfTravellers()}

					<ChooseSeats
						continueToPayment={this.continueToPayment}
						chooseSeat={this.state.chooseSeat}
						tickets={this.state.tickets}
						back={this.continueToSeats}
					/>

					<ChoosePayment
						choosePayment={this.state.choosePayment}
						continueToConfirmation={this.continueToConfirmation}
						submitNewOrder={this.submitNewOrder}
						back={this.continueToPayment}
					/>

					<Confirmation
						endTransaction={this.props.endTransaction}
						confirmation={this.state.confirmation}
						renderSendTicket={this.props.renderSendTicket}
					/>
				</div>
			</div>
		);
	}
}

export default BuySingleTicketBS;
