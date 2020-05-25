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
			tickets: [],
		};
	}

	/////////////////////////////////////////////////////////////////////////////////////////////
	// functions that deal with order data, that will be parsed to API after transaction is over
	//////////////////////////////////////////////////////////////////////////////////////////////

	componentDidMount() {
		this.initTicketTypes();
	}

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

	setUniqueOrderName = () => {
		this.restartOrder();
		let name;
		let date = new Date();
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Okt',
			'Nov',
			'Dec',
		];
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
				<div className="editNumberOfTravellersContainer">
					{this.state.ticketTypeNum.map((item, index) => {
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

	//////////////////////////////////////////////////////////////////////////////
	// updating API
	//////////////////////////////////////////////////////////////////////////////

	submitNewOrder = async () => {
		const url = 'https://localhost:5001/orders';
		const payload = this.state.order;
		let response;

		try {
			response = await fetch(url, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.log(err);
		}
		this.getNewOrderID();
	};

	getNewOrderID = async () => {
		let data;
		try {
			const response = await fetch('https://localhost:5001/orders', {
				method: 'get',
			});
			const payload = await response.json();
			data = payload;
		} catch (err) {}

		if (data) {
			let id = data[data.length - 1].id;
			this.submitTickets(id);
		}
	};

	submitTickets = async (id) => {
		const url = `https://localhost:5001/orders/${id}/basictickets`;
		const payload = this.state.tickets[0];
		let response;

		try {
			response = await fetch(url, {
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
		this.setState({ chooseDestination: false, chooseDeparture: true });
		this.setUniqueOrderName();
	};

	continueToSeats = () => {
		this.setState({ chooseDeparture: false, chooseSeat: true });
	};

	continueToPayment = () => {
		this.setState({ chooseSeat: false, choosePayment: true });
	};

	continueToConfirmation = () => {
		this.setState({ choosePayment: false, confirmation: true });
		console.log(this.state.order);
	};

	continueToSeatsHandler = () => {
		this.continueToSeats();
		this.createTicketInOrder();
	};

	render() {
		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
				<div className="">
					<HeaderBuySingle
						endTransaction={this.props.endTransaction}
						restartOrder={this.restartOrder}
						initTicketTypes={this.initTicketTypes}
					></HeaderBuySingle>

					<ChooseDestination
						chooseDestination={this.state.chooseDestination}
						hideBuySingleTicket={this.props.hideBuySingleTicket}
						continueToDepartures={this.continueToDepartures}
						setStartPoint={this.setStartPoint}
						setEndPoint={this.setEndPoint}
					></ChooseDestination>

					<ChooseDeparture
						chooseDeparture={this.state.chooseDeparture}
						editNumberOfTravellers={this.state.chooseTicketType}
						numberOfTravellers={this.state.ticketTypeNum}
						editTravellersHandler={this.editTravellersHandler}
						renderEditNumberOfTravellers={this.renderEditNumberOfTravellers}
						continueToSeats={this.continueToSeatsHandler}
						startPoint={this.state.startPoint}
						endPoint={this.state.endPoint}
					></ChooseDeparture>

					{this.renderEditNumberOfTravellers()}

					<ChooseSeats
						continueToPayment={this.continueToPayment}
						chooseSeat={this.state.chooseSeat}
						tickets={this.state.tickets}
					></ChooseSeats>

					<ChoosePayment
						choosePayment={this.state.choosePayment}
						continueToConfirmation={this.continueToConfirmation}
						submitNewOrder={this.submitNewOrder}
					></ChoosePayment>

					<Confirmation
						endTransaction={this.props.endTransaction}
						confirmation={this.state.confirmation}
						renderSendTicket={this.props.renderSendTicket}
					></Confirmation>
				</div>
			</div>
		);
	}
}

export default BuySingleTicketBS;
