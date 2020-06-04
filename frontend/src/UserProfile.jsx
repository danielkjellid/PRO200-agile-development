import React, { Component } from 'react';


import UserHeader from './components/UserHeader';
import TicketList from './components/TicketList'

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//I create fake user data for now
			name: '',
			activeTicket: true,
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
					tickets={[{id: '0f76be9e-6181-4b0f-bd24-0749204e7d39', name: 'Active ticket', active: true, price: '420,00'}]} 
				/>
			</div>
		);
	}
}

export default UserProfile;
