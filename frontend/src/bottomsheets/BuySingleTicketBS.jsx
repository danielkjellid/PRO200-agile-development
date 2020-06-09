// framework imports
import React, { Component } from 'react';

// component imports
import HeaderBuySingle from '../components/Global/HeaderBuySingle';
import DepartureEditTravellersModal from '../components/Departure/DepartureEditTravellersModal';
import Destination from '../components/Destination/Destination';
import Departure from '../components/Departure/Departure';
import Seats from '../components/Seats/Seats';
import Payment from '../components/Payment/Payment';
import OrderConfirmation from '../components/Confirmations/OrderConfirmation';


// bottom sheet that controls the entire purchase transaction
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
			order: {name: '', isActive: true},
			tickets: null,
		};
	}

	componentDidMount() {
		this.initTicketTypes();
	}

	// initialize all the ticket types with default Voksen: 1
	initTicketTypes = () => {
		const ticketTypes = [
			{type: 'Voksen', number: 1, price: 340, totalPrice: function() {return this.number * this.price}},
			{type: 'Barn (0-5 år)', number: 0, price: 0, totalPrice: function() {return this.number * this.price}},
			{type: 'Barn (6-17 år)', number: 0, price: 280, totalPrice: function() {return this.number * this.price}},
			{type: 'Ungdom (18-19 år)', number: 0, price: 290, totalPrice: function() {return this.number * this.price}},
			{type: 'Student', number: 0, price: 250, totalPrice: function() {return this.number * this.price}},
			{type: 'Honnør', number: 0, price: 120, totalPrice: function() {return this.number * this.price}},
		];
		this.setState({ticketTypeNum: ticketTypes});
	};

	// creates array of objects(tickets) that are furthermore posted in API
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
						price: ticketsChosen[i].price,
					});
					count--;
				}
			} else {
				continue;
			}
		}

		this.setState({tickets: ticketsPrint});
	};

	restartOrder = () => {
		this.setState({order: {name: '', isActive: true}});
	};

	// sets a default name for the order, it's the date order was purchased
	setUniqueOrderName = () => {
		this.restartOrder();

		let name;
		let date = new Date();
		const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec',];
		
		let hours = date.getHours();
		if(hours<10){hours = '0' + hours}
		let minutes = date.getMinutes();
		if(minutes<10){minutes= '0' + minutes}
		let seconds = date.getSeconds();
		if(seconds<10){seconds= '0' + seconds}
		
		name = `${date.getFullYear()}-${
			months[date.getMonth()]
		}-${date.getDate()} ${hours}:${minutes}:${seconds}`;
		this.setState({order: {name: name, isActive: true}});
	};

	setStartPoint = (value) => {
		this.setState({startPoint: value});
	};

	setEndPoint = (value) => {
		this.setState({endPoint: value});
	};

	// adds extra traveller
	addNumber = (id) => {
		this.setState({number: this.state.ticketTypeNum[id].number++});
	};

	// remove travellers
	removeNumber = (id) => {
		let number = this.state.ticketTypeNum[id].number;
		if (number > 0) {
			this.setState({ number: this.state.ticketTypeNum[id].number--});
		}
	};

	// triggers chooseTicketType modal
	editTravellersHandler = () => {
		this.setState({chooseTicketType: true});
	};

	// hides chooseTicketType modal
	hideEditNumberOfTravellers = () => {
		this.setState({chooseTicketType: false});
	};

	// renders chooseTicketType modal
	renderEditNumberOfTravellers = () => {
		if (this.state.chooseTicketType) {
			return (
				<div className="m-5">
					<div className="mb-2 bg-white rounded-lg z-10 block relative px-5 pb-5">
						{this.state.ticketTypeNum.map((item, index) => {
							return (
								<DepartureEditTravellersModal
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

	// gets last order id to continue sending tickets from
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

	// trigger different modals based on state
	continueToDepartures = () => {
		let chooseDeparture = this.state.chooseDeparture
		let chooseDestination = this.state.chooseDestination
		this.setState({chooseDestination: !chooseDestination, chooseDeparture: !chooseDeparture});
		this.setUniqueOrderName();
	};
	continueToSeats = () => {
		let chooseDeparture = this.state.chooseDeparture
		let chooseSeat = this.state.chooseSeat
		this.setState({chooseDeparture: !chooseDeparture, chooseSeat: !chooseSeat});
	};
	continueToPayment = () => {
		let chooseSeat = this.state.chooseSeat
		let choosePayment = this.state.choosePayment
		this.setState({chooseSeat: !chooseSeat, choosePayment: !choosePayment});
	};
	continueToConfirmation = () => {
		let choosePayment = this.state.choosePayment
		let confirmation = this.state.confirmation
		this.setState({choosePayment: !choosePayment, confirmation: !confirmation});
	};
	continueToSeatsHandler = () => {
		this.continueToSeats();
		this.createTicketInOrder();
	};
	backButtonHandler = () => {
		if(this.state.chooseDestination){this.props.hideBuySingleTicket()};
		if(this.state.chooseDeparture){this.setState({chooseDeparture: false, chooseDestination: true})};
		if(this.state.chooseSeat){this.setState({chooseSeat: false, chooseDeparture: true})};
		if(this.state.choosePayment){this.continueToPayment()};
	}

	render() {
		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal modal-footer">
				<div className="">
					<HeaderBuySingle
						endTransaction={this.props.endTransaction}
						back={this.backButtonHandler}
						restartOrder={this.restartOrder}
						initTicketTypes={this.initTicketTypes}
						confirmation={this.state.confirmation}
						updateAPI={this.props.updateAPI}
					/>

					<Destination
						startPoint={this.state.startPoint}
						endPoint={this.state.endPoint}
						chooseDestination={this.state.chooseDestination}
						
						continueToDepartures={this.continueToDepartures}
						setStartPoint={this.setStartPoint}
						setEndPoint={this.setEndPoint}
					/>

					<Departure
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

					<Seats
						continueToPayment={this.continueToPayment}
						chooseSeat={this.state.chooseSeat}
						tickets={this.state.tickets}
						back={this.continueToSeats}
					/>

					<Payment
						choosePayment={this.state.choosePayment}
						continueToConfirmation={this.continueToConfirmation}
						submitNewOrder={this.submitNewOrder}
						back={this.continueToPayment}
						startPoint={this.state.startPoint}
						endPoint={this.state.endPoint}
						numberOfTravellers={this.state.ticketTypeNum}
					/>

					<OrderConfirmation
						endTransaction={this.props.endTransaction}
						confirmation={this.state.confirmation}
						renderSendTicket={this.props.renderSendTicket}
						updateAPI={this.props.updateAPI}
						numberOfTravellers={this.state.ticketTypeNum}
					/>
				</div>
			</div>
		);
	}
}

export default BuySingleTicketBS;
