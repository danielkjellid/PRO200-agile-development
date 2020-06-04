import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Tickets from './Tickets';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';
import Navbar from './components/Navbar';
import ContactList from './ContactList';
import BuyNewTicket from './components/BuyNewTicket';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coverSite: false,
			loadUser: true,
			user: '',
			contactList: '',
			chooseTicket: false,
			orders: '',
			tickets: '',
			properObjects: ''
		};

		this.newTicketButtonHandler = this.newTicketButtonHandler.bind(this);
	}

	componentDidMount() {
		this.fetchUserInfo();
		this.fetchContactList();
		this.fetchOrders();

	}

	fetchOrders = async () => {
		try {
			const response = await fetch("https://localhost:5001/orders", { method: "get" });
			const payload = await response.json();
			console.log(payload);
			this.setState({
				isLoaded: true, orders: payload
			});

		} catch (err) {
			console.log(err);
		}
		this.fetchAllTickets();
	}

	fetchAllTickets = async () => {
		let tickets = [];
		let payloadTaken;
		if (this.state.orders) {
			for (let i = 0; i < this.state.orders.length; i++) {
				let order = {}
				try {
					const response = await fetch(`https://localhost:5001/orders/${this.state.orders[i].id}/basictickets`)
					const payload = await response.json()
					
					payloadTaken = payload;
				} catch (error) {
					console.log(error)
				}
				
					order.orderName = this.state.orders[i].name;
					order.id = this.state.orders[i].id;
					order.isActive = this.state.orders[i].isActive;
					order.from = payloadTaken[0].startPoint
					order.to  = payloadTaken[0].endPoint
					order.price = 412
					order.tickets = payloadTaken;
					//order.tickets = payload;
				
				tickets.push(order)
			}
		}
		this.setState({ tickets: tickets })
		console.log(this.state.tickets);
	}


	fetchUserInfo = async () => {
		try {
			const response = await fetch('https://localhost:5001/users');
			const payload = await response.json();
			this.setState({ user: payload, loadUser: false });
		} catch (err) {
			console.log(err);
		}
	};

	fetchContactList = async () => {
		try {
			const response = await fetch('https://localhost:5001/contacts');
			const payload = await response.json();
			this.setState({ contactList: payload });
		} catch (err) {
			console.log(err);
		}
	};

	notFound = () => {
		return <h1>not found</h1>;
	};

	fadeBackground = () => {
		//this function make the faded background appear behind modals
		this.setState({ coverSite: true });
	};

	cleanBackground = () => {
		this.setState({ coverSite: false })
	}

	sendUser = () => {
		if (this.state.user) {
			return this.state.user;
		} else {
			return 'empty';
		}
	};



	//buy new ticket functionality

	newTicketButtonHandler = () => {
		const newTicketShow = this.state.chooseTicket;

		if (newTicketShow) {
			this.setState({ chooseTicket: false });
			this.cleanBackground();
		} else {
			this.setState({ chooseTicket: true });
			this.fadeBackground();
		}
		console.log(this.state.chooseTicket);
	};





	render() {
		return (
			<BrowserRouter>
				<div>
					<div className={this.state.coverSite ? 'modalBack' : null}></div>
					<Navbar />
					<BuyNewTicket
						user={this.state.user[0]}
						chooseTicket={this.state.chooseTicket}
						newTicketButtonHandler={this.newTicketButtonHandler}
						cleanBackground={this.cleanBackground}
						fadeBackground={this.fadeBackground}
					/>
					<div className="bg-gray-100 canvas">
						<div className="content">
							<Switch>
								<Route
									exact
									path="/"
									render={(props) => (
										<UserProfile
											{...props}
											newTicketButtonHandler={this.newTicketButtonHandler}
											updateContactList={this.fetchContactList}
											fadeBackground={this.fadeBackground}
											endTransaction={this.endTransaction}
											user={this.state.user}
											contactList={this.state.contactList}
											orders={this.state.orders}
											tickets={this.state.tickets}
										></UserProfile>
									)}
								></Route>
								<Route
									exact
									path="/userdetails"
									render={(props) => <UserDetails {...props} />}
								></Route>
								<Route
									exact
									path="/tickets"
									render={(props) => (
										<Tickets
											{...props}
											newTicketButtonHandler={this.newTicketButtonHandler}
											searchContact={this.state.contactList}
											user={this.state.user}
											orders={this.state.orders}
											tickets={this.state.tickets}
										></Tickets>
									)}
								></Route>

								{/* For testing the component */}
								<Route
									exact
									path="/contactList"
									render={(props) => (
										<ContactList
											{...props}
											contacts={this.state.contactList}
											fetchNewContactList={this.fetchContactList}
										></ContactList>
									)}
								></Route>

								<Route component={this.notFound} />
							</Switch>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('root'));
