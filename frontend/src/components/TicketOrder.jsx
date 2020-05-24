import React, { Component } from 'react';
class TicketOrder extends Component {
    constructor(props){
        super(props);
        this.state={
            tickets: ''
        }
    }


    fetchTicketsByOrder = async (id) => {
        try {
          const response = await fetch(
            `https://localhost:5001/orders/${id}/basictickets`
          );
          const payload = await response.json();
          this.setState({
            tickets: payload
          })
        } catch(err) {
          console.log(err);
        }
      }

      searchContact = (id) => {
        let contactArr = this.props.contactList.find((item) => item.id === id)
        if(contactArr){
          return contactArr.firstName
        } else {return "Niks"}
      }

      renderTicketsByOrder = () => {
        
        return (this.state.tickets.map((item, index) => {
          return (
            <div key={index}>
              <p>{this.searchContact(item.ticketHolderId)}</p>
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
            <div onClick={() => this.fetchTicketsByOrder(this.props.id)} className="p-8 border border-gray-300 rounded-md font-medium text-gray-700">
                <h4>{this.props.itemName}</h4>
                {this.state.tickets ? this.renderTicketsByOrder() : null}
			</div>
        );
    }
}

export default TicketOrder;