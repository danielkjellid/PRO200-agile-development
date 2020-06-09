import React, { Component } from "react";
import { Link } from 'react-router-dom';
import UserHeader from '../components/Global/UserHeader'
import TicketList from '../components/Tickets/TicketList'

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
      return <TicketList changeOrderName={this.props.changeOrderName} title='Aktive billetter' tickets={activeTickets} contactList={this.props.contactList}/>
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
      return <TicketList changeOrderName={this.props.changeOrderName} title='Utgåtte gruppebilletter' tickets={expiredGroupTickets} contactList={this.props.contactList}/>
    }
  }

 
  render() {
    

   
    return (
      <div>
        <UserHeader
          userName={this.props.user}
          buttonHandler={this.props.newTicketButtonHandler}
        />
        <div className="px-4 pt-5">
          <Link to={'/'}>
            <div className="text-sm text-gray-900 flex items-center">
                <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className="h-5 w-5 text-gray-600"
                >
                  <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                  />
                </svg>
                Tilbake til profil
            </div>
          </Link>
        </div>

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
