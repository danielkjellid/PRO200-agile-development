// framework imports
import React, { Component } from 'react';

// component imports
import ContactItem from './ContactItem';
import ContactItemAddModal from './ContactItemAddModal';


// component that displays a list of available contacts
class ContactList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			addNewContactShow: false,
		};
	}

	componentDidMount() {
		this.fetchContactList();
	}

	// get contacts from API
	fetchContactList = async () => {
		try {
			const response = await fetch('https://localhost:5001/contacts');
			const payload = await response.json();
			this.setState({ contactList: payload });
		} catch (err) {
			console.log(err);
		}
	};

	addNewContactHandler = () => {
		let addNewContact = this.state.addNewContactShow;
		this.setState({addNewContactShow: !addNewContact});
	};

	render() {
		if (this.state.update) {
			this.updateHandler();
		}
		
		let contactList;
		let addNewContact;

		// if add new contact is clicked, show modal with imputs
		this.state.addNewContactShow
			? (addNewContact = (
				<ContactItemAddModal
					sendSMS={this.props.sendSMS}
					newContact={this.state.newContact}
					changeHandler={this.addNewContactHandler}
				/>
			))
			: (addNewContact = null);

		if (this.props.contactListShow) {
			contactList = (
				<div>
					<div
						className="flex flex-row justify-center align-center items-center cursor-pointer mx-12"
						onClick={this.addNewContactHandler}
					>
						<svg
							className="text-vy-green-300 w-5 h-5"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
						</svg>
						<p className="ml-3 text-gray-700 text-base font-medium">
							Send til telefonnummer
						</p>
					</div>
					<div className="px-5">
						<div className="rounded-md mt-5 mb-3 p-1 flex flex-row w-auto bg-gray-300">
							<button className="w-full bg-white mr-1 p-2 rounded text-sm font-medium text-gray-700">
								Kontakter
							</button>
							<button className="w-full bg-transparent ml-1 p-2 rounded text-sm font-medium text-gray-700">
								Grupper
							</button>
						</div>
						<div className="relative mb-5">
							<input
								className="py-2 pl-8 w-full border rounded border-gray-400 text-sm text-gray-700"
								placeholder="Søk"
							/>
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
								<svg
									className="w-4 h-4 text-gray-600"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
							</div>
						</div>
					</div>
					<div>
						<div className="bg-gray-200 px-5 py-1 border-b border-t border-gray-300 text-gray-700 uppercase text-sm font-bold">
							K
						</div>
						{/* this code below checks if tickets are assigned to persons or not. if yes state is presented as active */}
						{this.state.contactList
							.map((item, index) => {
								
								return (
									<ContactItem
										assignContactToTicket={() => this.props.assignContactToTicket(item.id)}
										removeContactFromTicket={() => this.props.removeContactFromTicket(item.id)}
										activeNum={this.props.activeNum}
										passiveNum={this.props.passiveNum}
										key={item.id}
										id={item.id}
										name={item.firstName}
										lastName={item.lastName}
										phone={item.phoneNumber}
										contactItem={item}
										currentType={this.props.currentType}
										ticketByType={this.props.ticketByType}
										addActive={this.props.addActive}
										removeActive={this.props.removeActive}
									/>
								);
							})
						}
					</div>
				</div>
			);
		}

		return (
			<div>
				{addNewContact}
				{contactList}
			</div>
		);
	}
}

export default ContactList;
