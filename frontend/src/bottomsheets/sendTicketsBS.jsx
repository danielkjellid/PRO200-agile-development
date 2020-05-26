import React, { Component } from "react";
import boughtTickets from "../fakeData/boughtTicket";
import Contact from "../components/Contact";
import HeaderSendTickets from "../components/sendTicketsComponents/HeaderSendTickets";

class SendTicketBS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewTicketsShow: true,
      contactListShow: false,
      sentTicketsConfirmationShow: false,
      loadOrder: false,
      order: '',
      ticketByType: [
        {type: 'Voksen', tickets:[]},
        {type: 'Barn', tickets:[]},
        {type: 'Ungdom', tickets:[]},
        {type: 'Student', tickets:[]},
        {type: 'Honnør', tickets:[]},
        
      ],
      renderButtonText: ["Send billetter", "Fortsett"],
    };
  }

  componentDidMount() {
    this.fetchTheLastOrder();
  }
////////////////////////////////////////////////////
//1. make a method to fetch the last purchased order
//2. make a method to fetch the correct order from the tickets list if doesnt have ticketHolders
//3. make a method to seperate all the tickets by type.
//4. make a method to send the ticket to the correct ticketHolderID
////////////////////////////////////////////////////
  fetchTheLastOrder = async () => {
    let order;
    try{
      const response = await fetch("https://localhost:5001/orders", {method: "get"});
      order =  await response.json();
    } catch(err){console.log(err);}

    if(order){
      let id = order[order.length-1].id;
      this.getAllTicketsFromOrder(id);
    }

  }

  getAllTicketsFromOrder = async (id) => {
    let tickets;
    try {
      const response = await fetch(`https://localhost:5001/orders/${id}/basictickets`, {method: "get"});
      tickets = await response.json();
    } catch(err){console.log(err);}

    this.setState({order: tickets, loadOrder: true}) //run method to split the tickets by type
  }


  pickContact = (id) => {
    this.setState({
      reviewTicketsShow: false,
      contactListShow: true,
    });
  };



  openContactList = () => {
    if (this.state.contactListShow) {
      return (
        <React.Fragment>
          <div>
            <p>Tilbake til billettoversikt</p>
            <button>Kontakter</button>
            <button>Grupper</button>
            <input placeholder="Søk" />
            
            {this.props.contactList.map((item)=> {
              return(<Contact name={item.firstName} lastName={item.lastName} phone={item.phoneNumber}></Contact>)
            })}
          </div>
        </React.Fragment>
      );
    }
  };

  backToSendTickets = () => {
    this.setState({ reviewTicketsShow: true, contactListShow: false });
  };

  renderButton = () => {
    let buttonClassNameToggle;

    if (this.state.reviewTicketsShow) {
      buttonClassNameToggle = "fortsettButton fortsettButtonDisabled";
      return (
        <button className={buttonClassNameToggle}>
          {this.state.renderButtonText[0]}
        </button>
      );
    }
    if (this.state.contactListShow) {
      buttonClassNameToggle = "fortsettButton fortsettButtonActive";
      return (
        <button
          onClick={this.backToSendTickets}
          className={buttonClassNameToggle}
        >
          {this.state.renderButtonText[1]}
        </button>
      );
    }
  };

  reviewTicket = () => {
    if (this.state.reviewTicketsShow) {
      return (
        <React.Fragment>
          <div>
            {this.state.boughtTickets.map((item) => {
              return (
                <div>
                  {item.ticket}
                  <div
                    onClick={() => {
                      this.pickContact(item.id);
                    }}
                  >
                    {item.activeTicket}
                    {item.passiveTicket}
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    if(this.state.loadOrder){console.log(this.state.order)};
    return (
      <div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
        <div className="">
          <HeaderSendTickets end={this.props.endSendingTickets}>
          </HeaderSendTickets>
   
          {this.reviewTicket()}
          {this.openContactList()}
          {this.renderButton()}
        </div>
      </div>
    );
  }
}

export default SendTicketBS;
