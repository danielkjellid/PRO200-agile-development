import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Tickets from './Tickets';
import UserDetails from './UserDetails';
import UserProfile from './UserProfile';
import Navbar from './components/navbar';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	notFound = () => {
		return <h1>not found</h1>;
	};

	render() {
		return (
			<BrowserRouter>
				<div>
					<Navbar />
					<Switch>
						<Route
							exact
							path="/"
							render={(props) => <UserProfile {...props}></UserProfile>}
						></Route>
						<Route
							exact
							path="/userdetails"
							render={(props) => <UserDetails {...props}></UserDetails>}
						></Route>
						<Route
							exact
							path="/tickets"
							render={(props) => <Tickets {...props}></Tickets>}
						></Route>
						<Route component={this.notFound}></Route>
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}
ReactDOM.render(<App></App>, document.getElementById('root'));
