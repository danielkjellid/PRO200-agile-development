import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TicketOrder from './components/TicketOrder';
import UserHeader from './components/UserHeader'
import TicketList from './components/TicketList'

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      orders: [],
      areTicketsLoaded: true,
      ticketsByOrder: [],
    };

    this.renderActiveTickets = this.renderActiveTickets.bind(this);
    this.renderExpiredGroupTickets = this.renderExpiredGroupTickets.bind(this);
   
  }


  // TODO: attach renderTickets functions to API, however we need the API to show more base info

  // function to render tickets until flags are fixed in backend
  // to be replaced with the other renderXTickets afterwards
  renderTempTickets() {
    let tickets = this.state.orders

    return (<TicketList title='Midlertidig inntil backend' tickets={tickets}/>)
  }

  renderActiveTickets(tickets) {
    if(tickets){
      let activeTickets = tickets.filter(ticket => ticket.isActive)
      return (<TicketList title='Aktive billetter' tickets={activeTickets}/>)
    }
  }
  
  // renderExpiredSingularTickets() {
  //   let exipredSingularTickets = this.state.dummyTickets.filter(ticket => ticket.singular == true && ticket.active == false)

  //   if (exipredSingularTickets.length > 0) {
  //     return (<TicketList title='Utgåtte enkeltbilletter' tickets={exipredSingularTickets}/>)
  //   }
  // }

  renderExpiredGroupTickets(tickets) {
    if(tickets){
      let expiredGroupTickets = tickets.filter(ticket => ticket.isActive === false)
      return (<TicketList title='Utgåtte gruppebilletter' tickets={expiredGroupTickets}/>)
    }
  }

 
  render() {
    

   
    return (
      <div>
        <UserHeader
          userName={this.props.user}
          buttonHandler={this.props.newTicketButtonHandler}
        />
        <Link to={'/'}>Tilbake</Link>

        {this.renderActiveTickets(this.props.tickets)}
        {this.renderExpiredGroupTickets(this.props.tickets)}
       

        {/* conditionally render ticketlists based on requirements wont render empty lists */}
        {/* {this.renderTempTickets()} */}
        {/* commentend out until we're able to filter based on active */}
        
        {/*
        {this.renderExpiredSingularTickets()}*/}
      
      </div>    
    )
  }
  
}

export default Tickets;
