// framework imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// component imports
import HeaderSendTickets from '../components/Global/HeaderSendTickets';
import ContactList from '../components/Contacts/ContactList';
import SentTicketConfirmation from '../components/Confirmations/SentTicketConfirmation';
import VippsConfirmation from '../components/Confirmations/VippsConfirmation';


// bottom sheet that controls the entire send ticket transaction
class SendTicketBS extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeNum: 0,
			passiveNum: 0,
			userInTrip: false,
			reviewTicketsShow: true,
			contactListShow: false,
			ticketsWereSent: false,
			splitBillInVipps: false,
			loadOrder: false,
			orderId: '',
			actives: [],
			currentType: '',
			ticketByType: [],
			ticketsToChange: '',
			renderButtonText: [
				'Send billetter',
				'Fortsett',
				'Opprett oppgjør i Vipps',
				'Se billettene',
			],
		};
	}

	componentDidMount() {
		this.fetchLatestActiveOrders();
	}

	fetchLatestActiveOrders = async () => {
		let order;

		try {
			const response = await fetch('https://localhost:5001/orders', {
				method: 'get',
			});
			order = await response.json();
		} catch (err) {
			console.log(err);
		}

		if (order) {
			let id = order[order.length - 1].id;
			this.setState({ orderId: id });
			this.getAllTicketsFromOrder(id);
		}
	};

	updateAPIFetch = async (orderId, basicticketsId, ticketHolderId) => {
		try {
			await fetch(
				`https://localhost:5001/orders/${orderId}/basictickets/${basicticketsId}/assignto/${ticketHolderId}`,
				{
					method: 'post',
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	updateAPI = () => {
		this.state.ticketByType.forEach((item) => {
			if (item.tickets.length > 0) {
				for (let i = 0; i < item.tickets.length; i++) {
					this.updateAPIFetch(
						this.state.orderId,
						item.tickets[i].id,
						item.tickets[i].ticketHolderId
					);
				}
			}
		});
	};

	//when the ticket is assigned to a contact it is copied to 'actives'. shows how many tickets of passive tickets are left
	getAllTicketsFromOrder = async (id) => {
		let tickets;
		try {
			const response = await fetch(
				`https://localhost:5001/orders/${id}/basictickets`,
				{ method: 'get' }
			);
			tickets = await response.json();

		} catch (err) {
			console.log(err);
		}

		this.setState({ loadOrder: true }); //run method to split the tickets by type
		this.seperateByType(tickets);
	};

	pickContact = (type, activeNum, passiveNum) => {

		this.setState({
			reviewTicketsShow: false,
			contactListShow: true,
			currentType: type,
			activeNum: activeNum,
			passiveNum: passiveNum
		});
	};

	// seperates tickets by types and adds 'active: false' to every ticket to make
	// it interactive while clicking in the checkbox
	seperateByType = (array) => {
		let tickets = [
			{ type: 'Voksen', tickets: [] },
			{ type: 'Barn (6-17 år)', tickets: [] },
			{ type: 'Ungdom (18-19 år)', tickets: [] },
			{ type: 'Student', tickets: [] },
			{ type: 'Honnør', tickets: [] },
		]

		array.forEach(item => {
			tickets.forEach(ticket => {
				if (item.type === ticket.type) {
					ticket.tickets.push(item)
				}
			})
		})

		this.setState({ ticketByType: tickets });
	};

	addActive = () => {
		this.setState({ activeNum: this.state.activeNum + 1 })
	}

	removeActive = () => {
		if (this.state.activeNum > 0) {
			this.setState({ activeNum: this.state.activeNum - 1 })
		}
	}

	//checks state of the chosen contacts. if contacts were assigned to a ticket, checkbox will be checked
	assignContactToTicket = (contactId) => {
		this.state.ticketByType.forEach(item => {
			if (item.type === this.state.currentType) {
				for (let i = 0; i < item.tickets.length; i++) {
					if (item.tickets[i].ticketHolderId === "00000000-0000-0000-0000-000000000000") {
						item.tickets[i].ticketHolderId = contactId;
						break;
					}
				}
			}
		})
	};
	//12345678-1234-1234-1234-123456789123

	assignMainUserToTicket = () => {
		this.state.ticketByType.forEach(item => {
			if (item.type === "Voksen") {
				for (let i = 0; i < item.tickets.length; i++) {
					if (item.tickets[i].ticketHolderId === "00000000-0000-0000-0000-000000000000") {
						item.tickets[i].ticketHolderId = this.props.user.id;
						this.setState({ userInTrip: true })
						break;
					}
				}
			}
		})
	}

	checkIfUser = () => {
		if (!this.state.userInTrip) {
			this.assignMainUserToTicket()
		} else {
			this.removeMainUserFromTicket()
		}
	}

	removeContactFromTicket = (contactId) => {
		this.state.ticketByType.forEach(item => {
			if (item.type === this.state.currentType) {
				for (let i = 0; i < item.tickets.length; i++) {
					if (item.tickets[i].ticketHolderId === contactId) {
						item.tickets[i].ticketHolderId = "00000000-0000-0000-0000-000000000000";
						break;
					}
				}
			}
		})
	}

	removeMainUserFromTicket = () => {
		this.state.ticketByType.forEach(item => {
			if (item.type === "Voksen") {
				for (let i = 0; i < item.tickets.length; i++) {
					if (item.tickets[i].ticketHolderId === this.props.user.id) {
						item.tickets[i].ticketHolderId = "00000000-0000-0000-0000-000000000000";
						this.setState({ userInTrip: false })
						break;
					}
				}
			}
		})
	}

	sendTicketBySMS = (person) => {
		const tickets = this.state.ticketsToChange;
		const text = {
			recipient: person.phoneNumber,
			textmessage:
				'Billett kjøpt til ' +
				person.firstName +
				' ' +
				person.lastName +
				'. Sete: ' +
				tickets[0].seat +
				', Type billett: ' +
				tickets[0].type +
				', Referanse kode: ' +
				tickets[0].referenceCode,
		};

		tickets.pop();

		fetch(
			`http://127.0.0.1:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
		).catch((err) => console.error(err));

		this.setState({ ticketsToChange: tickets })

		if (!this.checkIfAllTicketsDistributed()) {
			this.ticketsWereSent();
		} else {
			this.backToSendTickets();
		}
	};

	checkIfAllTicketsDistributed = () => {
		const tickets = this.state.ticketByType;

		let isMoreTickets = false;

		tickets.forEach(element => {
			if (element.tickets.passive.length !== 0) {
				return isMoreTickets = true;
			}
		})

		return isMoreTickets;
	}

	ticketsWereSent = () => {
		this.setState({ reviewTicketsShow: false, ticketsWereSent: true, contactListShow: false });
	};

	splitBillInVipps = () => {
		this.setState({ ticketsWereSent: false, splitBillInVipps: true });
	};

	backToSendTickets = () => {
		this.setState({ reviewTicketsShow: true, contactListShow: false, passiveNum: 0, activeNum: 0 });
	};

	renderButton = () => {
		let buttonEnabled = true

		let buttonClassNameToggle;

		if (this.state.reviewTicketsShow) {
			if (!buttonEnabled) {
				buttonClassNameToggle =
					'p-3 w-full bg-gray-500 text-center text-sm font-medium text-white rounded-md cursor-not-allowed';
				return (
					<button className={buttonClassNameToggle}>
						{this.state.renderButtonText[0]}
					</button>
				);
			} else {
				buttonClassNameToggle =
					'p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md';
				return (
					<button
						onClick={() => {
							this.ticketsWereSent();
							this.updateAPI();

						}}
						className={buttonClassNameToggle}
					>
						{this.state.renderButtonText[0]}
					</button>
				);
			}
		}
		if (this.state.contactListShow) {
			buttonClassNameToggle =
				'p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400';
			return (
				<button
					onClick={() => {
						this.backToSendTickets();
					}}
					className={buttonClassNameToggle}
				>
					{this.state.renderButtonText[1]}
				</button>
			);
		}

		if (this.state.ticketsWereSent) {
			return (
				<div className="flex flex-col">
					<button
						onClick={this.splitBillInVipps}
						className="bg-vy-green-200 w-full p-3 text-center text-sm font-medium text-vy-green-300 rounded-md mb-3"
					>
						{this.state.renderButtonText[2]}
					</button>
					<Link to={'/tickets'}>
						<button
							onClick={() => { this.props.endTransaction(); this.props.updateAPI() }}
							className="bg-vy-green-300 w-full p-3 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400"
						>
							{this.state.renderButtonText[3]}
						</button>
					</Link>
				</div>
			);
		}
	};

	backToReviewTicket = () => {
		this.setState({ reviewTicketsShow: true, contactListShow: false });
	};

	renderVipps = () => {
		if (this.state.splitBillInVipps) {
			return <VippsConfirmation splitBillInVipps={this.state.splitBillInVipps} />
		}
	}

	onKeydown = (event, passive, itemType) => {
		if (event.key === 'Enter') {
			this.pickContact(passive, itemType)
		}
	}

	reviewTicket = () => {
		if (this.state.reviewTicketsShow) {
			return (
				<div className="px-5 pb-5">
					<div className="pt-1 pb-6 text-center">
						<p className="text-gray-700 text-sm">Her kan du sende noen eller alle av billettene til venner og bekjente. Velg hvem i kontaktlisten du ønsker å sende billetten til ved å trykke på billettypen under.</p>
					</div>
					<div className="flex items-center border-b border-gray-300 pb-5">
						<input type="checkbox" defaultChecked={this.state.userInTrip} onClick={this.checkIfUser} />
						<span className="ml-2 mb-px text-sm text-gray-700 font-medium">Jeg skal være med på turen</span>
					</div>

					{this.state.ticketByType.map((item, index) => {
						if (item.tickets.length > 0) {
							let activeNum = (item.tickets.filter(item => item.ticketHolderId !== "00000000-0000-0000-0000-000000000000")).length
							return (
								<div
									onClick={() => {
										this.pickContact(item.type, activeNum, item.tickets.length);
									}}
									// onKeyDown={this.onKeydown(passive, item.type)}
									key={index}
									className="cursor-pointer flex items-center justify-between border-b border-gray-300 py-5"
									tabIndex="0"
									aria-label={'Send ' + item.type}
								>
									<div>
										<p className="font-medium text-gray-700 text-base">
											{item.type}
										</p>
										<p className="mt-px text-gray-700 text-sm">
											Hvem ønsker du å sende billetten til?
										</p>
									</div>
									<div
										className={
											activeNum !== item.tickets.length
												? 'bg-gray-300 flex items-center justify-center rounded-full p-2'
												: 'bg-vy-green-200 flex items-center justify-center rounded-full p-2'
										}
										tabIndex="0"
										aria-label={'Valgt å sende ' + activeNum + ' av ' + item.tickets.length + ' billetter'}
									>
										<span
											className={
												activeNum !== item.tickets.length
													? 'font-semibold text-gray-700 text-sm'
													: 'font-semibold text-vy-green-300 text-sm'
											}
										>
											{activeNum}/{item.tickets.length}
										</span>
									</div>
								</div>
							)
						} else {
							return null;
						}
					})}
				</div>
			);
		}
	}

	// Handle back/cancel button in header
	backButton = () => {
		if (this.state.splitBillInVipps) {
			this.props.updateAPI();
			this.props.endTransaction();
		} else if (this.state.contactListShow) {
			this.setState({ actives: [], clicks: 0 });
			this.backToSendTickets();
		} else {
			this.props.updateAPI();
			this.props.endTransaction();
		}
	}

	// returns back button or a cancel button in header
	returnArrowOrXBtn = () => {
		if (this.state.contactListShow) {
			return <svg className="cursor-pointer text-gray-700 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
		} else {
			return <svg className="h-5 w-5 text-gray-600 absolute right-0 mr-5 mb-5 -mt-3" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" /></svg>
		}
	}

	render() {
		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal modal-footer">
				<div className="">
					<HeaderSendTickets back={this.backButton} returnArrowOrXBtn={this.returnArrowOrXBtn} />
					{this.reviewTicket()}
					{this.renderVipps()}
					<ContactList
						sendSMS={this.sendTicketBySMS}
						updateContactList={this.props.updateContactList}
						back={this.backToReviewTicket}
						activeNum={this.state.activeNum}
						passiveNum={this.state.passiveNum}
						contactListShow={this.state.contactListShow}
						contactList={this.props.contactList}
						ticketByType={this.state.ticketByType}
						currentType={this.state.currentType}
						assignContactToTicket={this.assignContactToTicket}
						removeContactFromTicket={this.removeContactFromTicket}
						addActive={this.addActive}
						removeActive={this.removeActive}
					/>

					<SentTicketConfirmation
						ticketsWereSent={this.state.ticketsWereSent}
						updateAPI={this.props.updateAPI}
					/>
					<VippsConfirmation
						splitBillInVipps={this.state.splitBillInVipps}
					/>
					<div className="px-5 pt-5 pb-6 bg-gray-100 modal-footer">
						{this.renderButton()}
					</div>
				</div>
			</div>
		);
	}
}

export default SendTicketBS;
