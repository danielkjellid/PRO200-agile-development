import React from 'react';

import UserHeader from './components/UserHeader';
import TicketList from './components/TicketList'

function UserProfile(props) {
	
	const renderActiveTicketsUserProfile = (tickets) => {
		if(tickets){
		  let activeTickets = tickets.filter(ticket => ticket.isActive)
		  return (
		  <TicketList 
			  title="Aktiv billett"
			  changeOrderName={props.changeOrderName}
		  	linkLabel="Se alle billetter"
		  	to="/tickets"
			tickets={activeTickets}/>)
		}
	  }
	  
	return (
		<div>
			<UserHeader
				userName={props.user}
				buttonHandler={props.newTicketButtonHandler}
			/>
			{renderActiveTicketsUserProfile(props.tickets)}
		</div>
	);
}

export default UserProfile;
