// to be removed when ticketList and TicketItem is up and running

import React, { Component } from 'react';
class TicketOrder extends Component {
    constructor(props){
        super(props);
        this.state={
            fetchAPI: false,
            open: false,
            tickets: ''
        }
    }


    fetchTicketsByOrder = async (id) => {
      if(!this.state.fetchAPI){
        try {
          const response = await fetch(
            `https://localhost:5001/orders/${id}/basictickets`
          );
          const payload = await response.json();
          this.setState({
            tickets: payload,
            fetchAPI: true
          })
        } catch(err) {
          console.log(err);
        }
      }
    }

      showTickets = () => {
        let showTicket = this.state.open;
        this.setState({open: !showTicket});
      }

      searchContact = (id) => {
        let contactArr = this.props.contactList.find((item) => item.id === id)
        return contactArr ? contactArr.firstName : ""
      }

      renderTicketsByOrder = () => {
        
        return (this.state.tickets.map((item, index) => {
          return (
            <div key={index}>
              <p>Billett holder: {this.searchContact(item.ticketHolderId)}</p>
              <p>Type: {item.type}</p>
              <p>Fra: {item.startPoint}</p>
              <p>Til: {item.endPoint}</p>
              <p>Pris: {item.price}</p>
            </div>
          )
        }))
      
  }

    render() {
        return (
            <div onClick={() => {this.fetchTicketsByOrder(this.props.id); this.showTickets()} } className="p-8 border border-gray-300 rounded-md font-medium text-gray-700">
                <h4>{this.props.itemName}</h4>
                <div style={{display: this.state.open ? 'block' : 'none'}}>
                  {this.state.tickets ? this.renderTicketsByOrder() : null}
                </div>
			      </div>
        );
    }
}

export default TicketOrder;