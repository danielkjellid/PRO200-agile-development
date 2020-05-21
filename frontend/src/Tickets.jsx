import React, { Component } from "react";
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

  fetchTicketsByOrder = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:5001/orders/${id}/basictickets`
      );
      const payload = await response.json();
      this.setState({
        ticketsByOrder: payload
      })
    } catch(err) {
      console.log(err);
    }
  }
  
  showTicketsByOrder = (id) => {
      this.fetchTicketsByOrder(id)
    if (this.state.ticketsByOrder > 0) { this.renderTicketsByOrder() }
  }
  
  renderTicketsByOrder = () => {
    
        return (this.state.ticketsByOrder.map((item) => {
          return (
            <div>
              <p>{item.type}</p>
              <p>{item.startPoint}</p>
              <p>{item.endPoint}</p>
              <p>{item.price}</p>
            </div>
          )
        }))
      
  }
  
  render() {
    if (this.state.isLoaded) {
      return <div>Is Loading</div>;
    } else {
      return (this.state.orders.map((item) => {
        return (<div><p key={item.id} onClick={() => this.showTicketsByOrder(item.id)}>
          {item.name}</p><div>{this.renderTicketsByOrder()}</div></div>)
      }
      ))}
    }
}

export default Tickets;
