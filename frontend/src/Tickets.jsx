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
      dummyTickets: [
        {
          id: '486c460b-dbae-4a5a-a3ef-fb9e94e1ff4d',
          title: 'A',
          singular: true,
          from: 'Oslo S',
          to: 'Gjøvik',
          price: '420,00',
          active: true,
          expires: '23.03.2020'
        },
        {
          id: '0f76be9e-6181-4b0f-bd24-0749204e7d39',
          title: 'B',
          singular: true,
          from: 'Oslo S',
          to: 'Gjøvik',
          price: '420,00',
          active: false,
          expires: '23.03.2020'
        },
        {
          id: '85dcd822-1aa1-4362-ab9e-74067e25a023',
          title: 'C',
          singular: true,
          from: 'Oslo S',
          to: 'Gjøvik',
          price: '420,00',
          active: false,
          expires: '23.03.2020'
        },
        {
          id: '486c460b-dbae-4a5a-a3ef-fb9e94e1ff4d',
          title: 'D',
          singular: false,
          from: 'Oslo S',
          to: 'Gjøvik',
          price: '420,00',
          active: false,
          expires: '23.03.2020'
        },
        {
          id: '0f76be9e-6181-4b0f-bd24-0749204e7d39',
          title: 'E',
          singular: false,
          from: 'Oslo S',
          to: 'Gjøvik',
          price: '420,00',
          active: false,
          expires: '23.03.2020'
        },
        {
          id: '85dcd822-1aa1-4362-ab9e-74067e25a023',
          title: 'F',
          singular: false,
          from: 'Oslo S',
          to: 'Gjøvik',
          price: '420,00',
          active: false,
          expires: '23.03.2020'
        },
      ]
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://localhost:5001/orders", {method: "get"});
      
      const payload = await response.json();
      this.setState({
        orders: payload,
        isLoaded: true,
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  showTicketsByOrder = (id) => {

    this.fetchTicketsByOrder(id)
    if (this.state.ticketsByOrder > 0) { this.renderTicketsByOrder() }
  }

  // TODO: attach renderTickets functions to API, however we need the API to show more base info

  // function to render tickets until flags are fixed in backend
  // to be replaced with the other renderXTickets afterwards
  renderTempTickets() {
    let tickets = this.state.orders

    return (<TicketList title='Midlertidig inntil backend' tickets={tickets}/>)
  }

  renderActiveTickets() {
    let activeTickets = this.state.dummyTickets.filter(ticket => ticket.active == true)

    if (activeTickets.length > 0) {
      return (<TicketList title='Aktive billetter' tickets={activeTickets}/>)
    }
  }
  
  renderExpiredSingularTickets() {
    let exipredSingularTickets = this.state.dummyTickets.filter(ticket => ticket.singular == true && ticket.active == false)

    if (exipredSingularTickets.length > 0) {
      return (<TicketList title='Utgåtte enkeltbilletter' tickets={exipredSingularTickets}/>)
    }
  }

  renderExpiredGroupTickets() {
    let expiredGroupTickets = this.state.dummyTickets.filter(ticket => ticket.singular == false && ticket.active == false)

    if (expiredGroupTickets.length > 0) {
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

        {/* conditionally render ticketlists based on requirements wont render empty lists */}
        {this.renderTempTickets()}
        {/* commentend out until we're able to filter based on active */}
        {/* {this.renderActiveTickets()}
        {this.renderExpiredSingularTickets()}
        {this.renderExpiredGroupTickets()} */}
      </div>    
    )
  }
  
}

export default Tickets;
