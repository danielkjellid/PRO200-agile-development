import React, { Component } from 'react';
import ChooseTicketBS from './bottomsheets/ChooseTicketBS';
import BuySingleTicketBS from './bottomsheets/BuySingleTicketBS';
import SendTicketBS from './bottomsheets/SendTicketsBS';
import ActiveTickets from './components/ActiveTickets';

import UserHeader from './components/UserHeader';

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
				<ActiveTickets />
			</div>
		);
	}
}

export default UserProfile;
