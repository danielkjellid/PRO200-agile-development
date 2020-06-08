import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Tickets from './Tickets';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';
import Navbar from './components/Global/Navbar';
import ContactList from './ContactList';
import BuyNewTicket from './components/Global/BuyNewTicket';
import IntroModal from './components/Global/IntroModal';
import TicketItemEditModal from './components/Tickets/TicketItemEditModal';

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
			checkIfFirstTimeLaunch: true,
			firstTimeModal: false,
			editNameModal: false,
			orderToEdit: '',

		};

		this.newTicketButtonHandler = this.newTicketButtonHandler.bind(this);
		this.changeOrderName = this.changeOrderName.bind(this);
	}

	componentDidMount() {
		
		this.fetchUserInfo();
		this.fetchContactList();
		this.fetchOrders();
	}

	changeOrderName = (id) => {
		//get order by id
		//show current name in input field
		//while clickin on ok fetching update
		//refresh page
		this.changeOrderNameModal()
		this.state.orders.map(item => {
			if(item.id === id){
				this.setState({orderToEdit: item})
			}
		})
	}

	handleNameChange = (event) => {
		const oldState = {...this.state.orderToEdit}
		oldState.name = event.target.value
		this.setState({orderToEdit: oldState})
	}

	changeOrderNameModal = () => {
		this.setState({editNameModal: !this.state.editNameModal})		
	}

	acceptChange = async() => {
		const url = `https://localhost:5001/orders/${this.state.orderToEdit.id}`;
		const payload = this.state.orderToEdit;
		
		try {
			await fetch(url, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.log(err);
		}
		this.changeOrderNameModal();
		this.updateAPI()
	}

	

	updateAPI = () =>{
		window.location.reload(false);
	}

	fetchOrders = async () => {
		try {
			const response = await fetch("https://localhost:5001/orders", { method: "get" });
			const payload = await response.json();
			this.setState({
				isLoaded: true, orders: payload
			});

		} catch (err) {
			console.log(err);
		}
		this.checkIfFirstTimeLaunch();
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
					order.orderName = this.state.orders[i].name;
					order.id = this.state.orders[i].id;
					order.isActive = this.state.orders[i].isActive;
					order.from = payloadTaken[0].startPoint
					order.to  = payloadTaken[0].endPoint
					let totalPrice=0;
					for(let i=0;i<payloadTaken.length;i++){
						totalPrice +=  payloadTaken[i].price
					}

					order.price = totalPrice
					order.tickets = payloadTaken;
					//order.tickets = payload;
				
				tickets.push(order)
				} catch (error) {
					console.log(error)
				}
					
					
			}
		}
		this.setState({ tickets: tickets })
	
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


	//this functions checks if app runs for the first time. its super primitive cause hereby I check
	//if the DB has been updated since the last time. Normally I would never do anything like that but 
	// in this case it will work. Have to fix before final delivery
	checkIfFirstTimeLaunch = () => {
		if(this.state.orders){
			if(this.state.orders.length > 4){
				this.setState({checkIfFirstTimeLaunch: false})
			} else {this.setState({checkIfFirstTimeLaunch: true})}
	}}

	closeIntroModal = () => {
		this.setState({checkIfFirstTimeLaunch: false})
	}


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
					<div className={this.state.coverSite ? 'w-full h-full z-10 block fixed bottom-0 bg-black opacity-25' : null}></div>
					<div className={this.state.firstTimeModal ? 'w-full h-full z-10 block fixed bottom-0 bg-black opacity-25' : null}></div>
					<TicketItemEditModal 
						show={this.state.editNameModal} 
						name={this.state.orderToEdit.name}
						handleNameChange={this.handleNameChange}
						acceptChange={this.acceptChange}
					/>
					<Navbar />
					<BuyNewTicket
						user={this.state.user[0]}
						chooseTicket={this.state.chooseTicket}
						newTicketButtonHandler={this.newTicketButtonHandler}
						cleanBackground={this.cleanBackground}
						fadeBackground={this.fadeBackground}
						updateAPI={this.updateAPI}
					/>
					{this.state.checkIfFirstTimeLaunch ? 
						<IntroModal 
							closeIntroModal={this.closeIntroModal}

						/> : null
					}
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
											changeOrderName={this.changeOrderName}
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
											changeOrderName={this.changeOrderName}
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
