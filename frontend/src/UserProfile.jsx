import React, { Component } from 'react';

import UserHeader from './components/UserHeader';
import TicketList from './components/TicketList'

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//I create fake user data for now
			name: '',
			activeTickets: '',
		
		};

		
	}
	render() {
		return (
			<div>
				
				<UserHeader
					userName={this.props.user}
					buttonHandler={this.props.newTicketButtonHandler}
				/>
				<TicketList
					title="Aktiv billett"
					linkLabel="Se alle billetter"
					to="/tickets"
					orders={this.props.orders}
					tickets={this.props.tickets}
				/> 
			}

				
			</div>
		);
	}
}

export default UserProfile;
