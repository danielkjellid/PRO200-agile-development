import React, { Component } from "react";
import { Link } from 'react-router-dom';
import TicketOrder from './components/TicketOrder';

class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      orders: [],
      areTicketsLoaded: true,
      ticketsByOrder: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://localhost:5001/orders", {method: "get"});
      
      const payload = await response.json();
      this.setState({
        orders: payload,
        isLoaded: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

 
  
  showTicketsByOrder = (id) => {

    this.fetchTicketsByOrder(id)
    if (this.state.ticketsByOrder > 0) { this.renderTicketsByOrder() }
  }
  

  
  render() {
    let inhold;
    if (this.state.isLoaded) {
      inhold =  <div>Is Loading</div>;
    } else {
      inhold= (this.state.orders.map((item) => {
        return (
          <div>
            <TicketOrder 
              key={item.id} 
              id={item.id}
              itemName={item.name}>  
            </TicketOrder>
          </div>
      )}))
    }
    
    return (
      <div>
        <Link to={'/'}>Tilbake</Link>
        {inhold}
      </div>    
    )
  }
  
}

export default Tickets;
