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
      ticketByType: [],
      renderButtonText: ["Send billetter", "Fortsett"],
    };
  }

  componentDidMount() {
    this.fetchTheLastOrder();
  }
////////////////////////////////////////////////////
//1. make a method to fetch the last purchased order DONE
//2. make a method to fetch the correct order from the tickets list if doesnt have ticketHolders
//3. make a method to seperate all the tickets by type.
//4. make a method to send the ticket to the correct ticketHolderID
//5. make a method that limits number of selections in checkbox
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

    this.setState({loadOrder: true}) //run method to split the tickets by type
    this.seperateByType(tickets);
  }


  pickContact = (id) => {
    this.setState({
      reviewTicketsShow: false,
      contactListShow: true,
    });
  };

  //this method seperates tickets by types and adds 'active: false' to every ticket to make 
  //it interactive while clicking in the checkbox
  seperateByType = (array) => {
    let tickeyByType = [
      {type: 'Voksen', tickets:{passive: [], active: []}},
      {type: 'Barn (6-17 år)', tickets:{passive: [], active: []}},
      {type: 'Ungdom (18-19 år)', tickets:{passive: [], active: []}},
      {type: 'Student', tickets:{passive: [], active: []}},
      {type: 'Honnør', tickets:{passive: [], active: []}}
    ];
    
    for(let i = 0; i<array.length; i++){
      for(let j = 0; j<tickeyByType.length; j++){
        array[i].active = false
        if(array[i].type == tickeyByType[j].type){
          tickeyByType[j].tickets.passive.push(array[i])}}
          this.setState({ticketByType: tickeyByType})
    } 
  }


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
            {this.state.ticketByType.map((item,index) => {
              if(item.tickets.passive.length > 0){
                return (
                <div key={index}>{item.type}:  {item.tickets.active.length}/{item.tickets.passive.length}</div>
                //   <div>
                //     {item.ticket}
                //     <div
                //       onClick={() => {
                //         this.pickContact(item.id);
                //       }}
                //     >
                //       {item.activeTicket}
                //       {item.passiveTicket}
                //     </div>
                //   </div>
                );
              }
            })}
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    if(this.state.loadOrder){console.log(this.state.ticketByType)};
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
