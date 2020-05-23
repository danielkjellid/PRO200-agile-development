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

      renderTicketsByOrder = () => {
        return (this.state.tickets.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.type}</p>
              <p>{item.startPoint}</p>
              <p>{item.endPoint}</p>
              <p>{item.price}</p>
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