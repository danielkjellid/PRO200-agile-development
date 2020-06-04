import React, { Component } from 'react';

import UserHeader from './components/UserHeader';
import TicketList from './components/TicketList'

class UserProfile extends Component {
	
	renderActiveTicketsUserProfile(tickets) {
		if(tickets){
		  let activeTickets = tickets.filter(ticket => ticket.isActive)
		  return (
		  <TicketList 
		  	title="Aktiv billett"
		  	linkLabel="Se alle billetter"
		  	to="/tickets"
			tickets={activeTickets}/>)
		}
	  }
	  

	render() {
		return (
			<div>
				
				<UserHeader
					userName={this.props.user}
					buttonHandler={this.props.newTicketButtonHandler}
				/>

				{this.renderActiveTicketsUserProfile(this.props.tickets)}

				{/* <TicketList
					title="Aktiv billett"
					linkLabel="Se alle billetter"
					to="/tickets"
					orders={this.props.orders}
					tickets={this.props.tickets}
				/>  */}
			

				
			</div>
		);
	}
}

export default UserProfile;
