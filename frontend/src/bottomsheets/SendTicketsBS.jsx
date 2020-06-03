import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderSendTickets from '../components/sendTicketsComponents/HeaderSendTickets';
import ContactListSendTicket from '../components/sendTicketsComponents/ContactListSendTicket';
import TicketsWereSend from '../components/sendTicketsComponents/TicketsWereSend';
import MakeAccountInVIpps from '../components/sendTicketsComponents/MakeAccountInVIpps';

class SendTicketBS extends Component {
	constructor(props) {
		super(props);

		this.state = {
			clicks: 0,
			reviewTicketsShow: true,
			contactListShow: false,
			ticketsWereSent: false,
			makeAccountInVipps: false,
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
		this.fetchTheLastOrder();
	}

	addClick = () => {
		this.setState({ clicks: this.state.clicks + 1 });
	};

	substractClick = () => {
		console.log(typeof this.state.clicks);
		this.setState({ clicks: this.state.clicks - 1 });
	};
	////////////////////////////////////////////////////
	//1. make a method to fetch the last purchased order DONE
	//2. make a method to fetch the correct order from the tickets list if doesnt have ticketHolders
	//3. make a method to seperate all the tickets by type.
	//4. make a method to send the ticket to the correct ticketHolderID
	//5. make a method that limits number of selections in checkbox
	////////////////////////////////////////////////////

	fetchTheLastOrder = async () => {
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
		this.state.ticketByType.map((item) => {
			if (item.tickets.active.length > 0) {
				for (let i = 0; i < item.tickets.active.length; i++) {
					this.updateAPIFetch(
						this.state.orderId,
						item.tickets.active[i].id,
						item.tickets.active[i].ticketHolderId
					);
				}
			}
		});
	};

	addToActives = (id) => {
		let activesArr = this.state.actives;
		activesArr.push(id);
		this.setState({ actives: activesArr });
		this.addClick();
	};

	removeFromActives = (id) => {
		let activesArr = this.state.actives;
		let findElement = activesArr.find((element) => element.id === id);
		let findIndex = activesArr.indexOf(findElement);
		console.log(findIndex);
		if (findIndex > -1) {
			activesArr.splice(findIndex, 1);
		}
		this.setState({ actives: activesArr });
		this.substractClick();
	};

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

	pickContact = (array, type) => {
		this.setState({
			reviewTicketsShow: false,
			contactListShow: true,
			ticketsToChange: array,
			currentType: type,
		});
	};

	//this method seperates tickets by types and adds 'active: false' to every ticket to make
	//it interactive while clicking in the checkbox
	seperateByType = (array) => {
		let tickeyByType = [
			{ type: 'Voksen', tickets: { passive: [], active: [] } },
			{ type: 'Barn (6-17 år)', tickets: { passive: [], active: [] } },
			{ type: 'Ungdom (18-19 år)', tickets: { passive: [], active: [] } },
			{ type: 'Student', tickets: { passive: [], active: [] } },
			{ type: 'Honnør', tickets: { passive: [], active: [] } },
		];

		for (let i = 0; i < array.length; i++) {
			for (let j = 0; j < tickeyByType.length; j++) {
				array[i].active = false;
				if (array[i].type == tickeyByType[j].type) {
					tickeyByType[j].tickets.passive.push(array[i]);
				}
			}
			this.setState({ ticketByType: tickeyByType });
		}
	};

	// checkIfAddClicks = (length) => {
	//   let count = 0;
	//   while(count>0 && count<=length){
	//     console.log("added");
	//     this.addClick();
	//     count++;
	//   }
	// }

	checkIfAddClicks = () => {
		if (this.state.actives > 0) {
			this.setState({ clicks: this.state.actives.length });
		}
	};

	checkIfPassEqAct = () => {
		const ticketsNum = this.state.ticketByType;
		let counter = 0;
		for (let i = 0; i < ticketsNum.length; i++) {
			if (
				ticketsNum[i].tickets.passive.length ===
				ticketsNum[i].tickets.active.length
			) {
				counter++;
			} else {
				break;
			}
		}
		if (counter === ticketsNum.length) {
			return true;
		} else {
			return false;
		}
	};

	assignContactToTicket = () => {
		this.state.ticketByType.map((item) => {
			for (let i = 0; i < item.tickets.passive.length; i++) {
				if (item.type === this.state.currentType) {
					item.tickets.passive[i].ticketHolderId = this.state.actives[i];
					if (this.state.actives.length > 0) {
						if (item.tickets.passive[i].ticketHolderId) {
							item.tickets.active[i] = item.tickets.passive[i];
						}
					} else {
						item.tickets.active.length = 0;
					}
				}
			}
		});
		this.setState({ actives: [] });
	};

	sendOnSMS = (ticketsWithContacts) => {
		ticketsWithContacts.forEach((element) => {
			const { active } = element.tickets;
			if (active.length !== 0) {
				const person = active[0].ticketHolderId;
				const text = {
					recipient: person.phoneNumber,
					textmessage:
						'Billett kjøpt til ' +
						person.firstName +
						' ' +
						person.lastName +
						'. Sete: ' +
						active[0].seat +
						', Type billett: ' +
						active[0].type +
						', Referanse kode: ' +
						active[0].referenceCode,
				};

				fetch(
					`http://127.0.0.1:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
				).catch((err) => console.error(err));
			}
		});
	};

	restartClicks = () => {
		this.setState({ clicks: 0 });
	};

	ticketsWereSent = () => {
		this.setState({ reviewTicketsShow: false, ticketsWereSent: true });
	};

	makeAccountInVIpps = () => {
		this.setState({ ticketsWereSent: false, makeAccountInVIpps: true });
	};

	backToSendTickets = () => {
		this.setState({ reviewTicketsShow: true, contactListShow: false });
	};

	renderButton = () => {
		let buttonTruth = this.checkIfPassEqAct();

		let buttonClassNameToggle;

		if (this.state.reviewTicketsShow) {
			if (!buttonTruth) {
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
							this.sendOnSMS(this.state.ticketByType);
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
						this.assignContactToTicket(this.state.orderId);
						this.restartClicks();
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
						onClick={this.makeAccountInVIpps}
						className="bg-vy-green-200 w-full p-3 text-center text-sm font-medium text-vy-green-300 rounded-md mb-3"
					>
						{this.state.renderButtonText[2]}
					</button>
					<Link to={'/tickets'}>
						<button
							onClick={this.props.endTransaction}
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

	reviewTicket = () => {
		if (this.state.reviewTicketsShow) {
			return (
				<div className="px-5 pb-5">
					{this.state.ticketByType.map((item, index) => {
						if (item.tickets.passive.length > 0) {
							let passive = item.tickets.passive;
							const passiveNum = item.tickets.passive.length;
							const activeNum = item.tickets.active.length;
							return (
								<div
									onClick={() => {
										this.pickContact(passive, item.type);
										this.checkIfAddClicks();
									}}
									key={index}
									className="cursor-pointer flex items-center justify-between border-b border-gray-300 py-5"
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
											activeNum !== passiveNum
												? 'bg-gray-300 flex items-center justify-center rounded-full p-2'
												: 'bg-vy-green-200 flex items-center justify-center rounded-full p-2'
										}
									>
										<span
											className={
												activeNum !== passiveNum
													? 'font-semibold text-gray-700 text-sm'
													: 'font-semibold text-vy-green-300 text-sm'
											}
										>
											{activeNum}/{passiveNum}
										</span>
									</div>
								</div>
							);
						}
					})}
				</div>
			);
		}
	};

	render() {
		return (
			<div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
				<div className="">
					<HeaderSendTickets end={this.props.endSendingTickets} />
					{this.reviewTicket()}
					<ContactListSendTicket
						updateContactList={this.props.updateContactList}
						back={this.backToReviewTicket}
						clicks={this.state.clicks}
						addClick={this.addClick}
						passiveTickets={this.state.ticketsToChange}
						contactListShow={this.state.contactListShow}
						contactList={this.props.contactList}
						addToActives={this.addToActives}
						removeFromActives={this.removeFromActives}
					/>

					<TicketsWereSend ticketsWereSent={this.state.ticketsWereSent} />
					<MakeAccountInVIpps
						makeAccountInVIpps={this.state.makeAccountInVipps}
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
