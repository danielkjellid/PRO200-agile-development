import React, { Component } from 'react';
import ChooseTicketBS from './bottomsheets/ChooseTicketBS';
import BuySingleTicketBS from './bottomsheets/BuySingleTicketBS';
import SendTicketBS from './bottomsheets/SendTicketsBS';

import UserHeader from './components/UserHeader';
import TicketList from './components/TicketList'

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
		if (this.state.contactList) {
			contactList = this.state.contactList;
		}
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
	};

	render() {
		return (
			<div>
				{this.renderChooseTicket()}
				{this.renderBuySingleTicket()}
				{this.renderSendTicket()}
				<UserHeader
					userName={this.props.user}
					buttonHandler={this.newTicketButtonHandler}
				/>
				<TicketList
					title="Aktiv billett"
					linkLabel="Se alle billetter"
					to="/tickets"
					tickets={[{id: '0f76be9e-6181-4b0f-bd24-0749204e7d39', name: 'Active ticket', active: true, price: '420,00'}]} 
				/>
			</div>
		);
	}
}

export default UserProfile;
