// framework imports
import React, { Component } from 'react';

// component imports
import ChooseTicketBS from '../../bottomsheets/ChooseTicketBS';
import BuySingleTicketBS from '../../bottomsheets/BuySingleTicketBS';
import SendTicketBS from '../../bottomsheets/SendTicketsBS';


// component that decides which bottom sheets are display depending on the current step in the purchase/sending process
class BuyNewTicket extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			singleTicket: false,
			periodTicket: false,
			sendTicketShow: false
		}
	}

	buySingleTicketButtonHandler = () => {
		const buySingleTicketShow = this.state.singleTicket;
		this.setState({ singleTicket: !buySingleTicketShow });
		this.props.newTicketButtonHandler();
		this.props.fadeBackground();
	};

	renderChooseTicket = () => {
		if (this.props.chooseTicket) {
			return (
				<ChooseTicketBS
					click={this.buySingleTicketButtonHandler}
					clickX={this.props.newTicketButtonHandler}
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
					updateAPI={this.props.updateAPI}
				/>
			);
		}
	};

	sendTicketsHandler = () => {
		this.setState({sendTicketShow: true});
		this.setState({singleTicket: false});
	};

	renderSendTicket = () => {
		if (this.state.sendTicketShow) {
			return (
				<SendTicketBS
					user={this.props.user}
					updateContactList={this.updateContactList}
					contactList={this.contactList}
					endTransaction={this.endTransaction}
					endSendingTickets={this.endSendingTickets}
					updateAPI={this.props.updateAPI}
				/>
			);
		}
	};

	hideBuySingleTicket = () => {
		this.endTransaction();
		this.props.newTicketButtonHandler();
	};

	endTransaction = () => {
		this.setState({ singleTicket: false, sendTicketShow: false });
		this.props.cleanBackground();
	};

	endSendingTickets = () => {
		this.setState({ sendTicketShow: false });
		this.endTransaction();
	};

	render() {
		return (
			<div>
				{this.renderChooseTicket()} 
				{this.renderBuySingleTicket()}
				{this.renderSendTicket()}
			</div>
		);
	}
}

export default BuyNewTicket;