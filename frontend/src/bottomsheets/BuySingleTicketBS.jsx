import React, { Component } from 'react';
//import numberOfTravellers from '../numberOfTravellers';
import EditTravellers from '../bottomsheets/EditTravellers';
import Seats from '../components/Seats';
import ChooseDestination from '../components/buySingleTicketComponents/ChooseDestination';
import ChooseDeparture from '../components/buySingleTicketComponents/ChooseDeparture';

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
			order: {
				orderName: '',
				tickets:  null
			}
		};
	}

	
	/////////////////////////////////////////////////////////////////////////////////////////////
	// functions that deal with order data, that will be parsed to API after transaction is over
	//////////////////////////////////////////////////////////////////////////////////////////////
	
	componentDidMount() {
		this.initTicketTypes();
	}


	initTicketTypes = () => {
		const editTravellers =  [{type: "Voksen",number: 1},{type: "Barn (6-17 år)",number: 0},
		{type: "Ungdom (18-19 år)",number: 0},{type: "Student",number: 0},{type: "Honnør",number: 0}];
		this.setState({ticketTypeNum: editTravellers});
	}


	createTicketInOrder = () => {
	let ticketsPrint =  [];
	let ticketsChosen = this.state.ticketTypeNum;
    console.log(ticketsChosen);
    for(let i =0; i<ticketsChosen.length; i++){
        if(ticketsChosen[i].number > 0){
			let count = ticketsChosen[i].number;
            while(count > 0){
				ticketsPrint.push({type: ticketsChosen[i].type, 
									startPoint: this.state.startPoint,
									endPoint: this.state.endPoint,
									referenceCode: '',
									seat: '',
									price: 0});
                count--;
            } 
        } else {continue}
    }
    this.setState(prevState => ({
		order:{
			...prevState.order,
			tickets: ticketsPrint
		}
	}))
};

	restartOrder = () => {
		this.setState({order:{
							orderName: '',
							tickets: null
		}});
	}

	setUniqueOrderName = () => {
		this.restartOrder();
		let name;
			let date = new Date();
			name = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}
			${date.getSeconds()}`
		
			this.setState({order: {
				orderName: name,
				tickets: []
			}})
	}

	setStartPoint = (value) => {
		this.setState({startPoint: value})
	}

	setEndPoint = (value) => {
		this.setState({endPoint: value})
	}

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
				</div>);}
	};

	renderChooseDestination = () => {
		return(
			<ChooseDestination 
				chooseDestination={this.state.chooseDestination}
				hideBuySingleTicket={this.props.hideBuySingleTicket}
				continueToDepartures={this.continueToDepartures}
				setStartPoint={this.setStartPoint}
				setEndPoint={this.setEndPoint}
			></ChooseDestination>
		)
	}

	renderChooseDeparture = () => {
		
		return(
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
		)
	}

	renderChooseSeats = () => {
		if(this.state.chooseSeat){
			return (
				<div
						className={this.state.chooseSeat ? 'displayBlock' : 'displayNone'}
					>
						<div>Choose the seat site</div>
						<Seats />
						<button
							onClick={this.continueToPayment}
							className="fortsettButton fortsettButtonActive"
						>
							Fortsett til betaling
						</button>
					</div>	
			);
		}
	};

	renderChoosePayment = () => {
		if(this.state.choosePayment){
			return(
				<div className={this.state.choosePayment ? 'displayBlock' : 'displayNone'}>
					<div>Betaling site</div>
					<button onClick={this.continueToConfirmation} className="fortsettButton fortsettButtonActive">
						Bekreft og betal bestillingen
					</button>
				</div>
			)
		}
	}

	//////////////////////////////////////////////////////////////////////////////
	// functions to trigger different modals depend on which one is 'true' in state
	//////////////////////////////////////////////////////////////////////////////
	continueToDepartures = () => {
		this.setState({ chooseDestination: false, chooseDeparture: true });
		this.setUniqueOrderName();
	};

	continueToSeats = () => {
		this.setState({ chooseDeparture: false, chooseSeat: true });
	};

	continueToPayment = () => {
		this.setState({ chooseSeat: false, choosePayment: true});
	};

	continueToConfirmation = () => {
		this.setState({ choosePayment: false, confirmation: true  });
	};

	continueToSeatsHandler = () => {
		this.continueToSeats();
		this.createTicketInOrder()
	}

	render() {
		
		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
				<div className="">
					{/* header of the BuySingleTicket bottom sheet */}
					<div className="flex flex-row justify-between p-5 border-b border-grey-300 mb-5">
						<p className="font-medium">Kjøp enkeltbillett</p>
						<button onClick={() => {this.props.endTransaction(); this.restartOrder(); this.initTicketTypes()}}>
						<svg className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
						</button>
					</div>


					{this.renderChooseDestination()}	
					
					{this.renderChooseDeparture()}
					
					{this.renderEditNumberOfTravellers()}
					
					{this.renderChooseSeats()}
			
					{this.renderChoosePayment()}	

					


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
