import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Tickets from './Tickets';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';
import Navbar from './components/Navbar';
import ContactList from './ContactList';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			coverSite: false,
			loadUser: true,
			user: '',
			contactList: '',
		};
	}

	componentDidMount() {
		this.fetchUserInfo();
		this.fetchContactList();
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

	endTransaction = () => {
		//this function make the faded background disappear
		this.setState({ coverSite: false });
	};

	sendUser = () => {
		if (this.state.user) {
			return this.state.user;
		} else {
			return 'empty';
		}
	};

	render() {
		return (
			<BrowserRouter>
				<div>
					<div className={this.state.coverSite ? 'modalBack' : null}></div>
					<Navbar />
					<div className="bg-gray-100 canvas">
						<div className="content">
							<Switch>
								<Route
									exact
									path="/"
									render={(props) => (
										<UserProfile
											{...props}
											updateContactList={this.fetchContactList}
											fadeBackground={this.fadeBackground}
											endTransaction={this.endTransaction}
											user={this.state.user}
											contactList={this.state.contactList}
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
											searchContact={this.state.contactList}
											user={this.state.user}
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
