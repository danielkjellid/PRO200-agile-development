import React, { Component } from "react";
import boughtTickets from "../fakeData/boughtTicket";
import Contact from "../components/Contact";
import HeaderSendTickets from "../components/sendTicketsComponents/HeaderSendTickets";
import ContactListSendTicket from '../components/sendTicketsComponents/ContactListSendTicket';

class SendTicketBS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewTicketsShow: true,
      contactListShow: false,
      sentTicketsConfirmationShow: false,
      loadOrder: false,
      actives: [],
      currentType: '',
      ticketByType: [],
      chooseTicketHolder: "",
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

  addToActives = (id) => {
      let activesArr = this.state.actives;
      activesArr.push(id);
      console.log(activesArr);
      this.setState({actives: activesArr});
  }

  removeFromActives = (id) => {
    let activesArr = this.state.actives;
    let findIndex = activesArr.indexOf(id);
    if(findIndex > -1){
      activesArr.splice(findIndex, 1)
    }
    this.setState({actives: activesArr})
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


  pickContact = (array, type) => {
    this.setState({
      reviewTicketsShow: false,
      contactListShow: true,
      chooseTicketHolder: array,
      currentType: type
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

 assignContactToTicket= () => {
   let changeTickets =  this.state.ticketByType.map((item) => {
     if(item.type === this.state.currentType){
       console.log(item.tickets);
       for(let i= 0;i<item.tickets.passive.length;i++){
         item.tickets.passive[i].ticketHolderId = this.state.actives[i]
         console.log(item.tickets.passive[i].ticketHolderId + "yes");
       }
     }
  })
  console.log(changeTickets);
 }
 


  backToSendTickets = () => {
    this.setState({ reviewTicketsShow: true, contactListShow: false });
  };

  renderButton = () => {
    let buttonClassNameToggle;

    if (this.state.reviewTicketsShow) {
      buttonClassNameToggle = "p-3 w-full bg-gray-500 text-center text-sm font-medium text-white rounded-md cursor-not-allowed";
      return (
        <button className={buttonClassNameToggle}>
          {this.state.renderButtonText[0]}
        </button>
      );
    }
    if (this.state.contactListShow) {
      buttonClassNameToggle = "p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400";
      return (
        <button
          onClick={() => {this.backToSendTickets(); this.assignContactToTicket()}}
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
          <div className="px-5 pb-5">
            {this.state.ticketByType.map((item,index) => {
              if (item.tickets.passive.length > 0) {
                let passive = item.tickets.passive;
                const passiveNum = item.tickets.passive.length;
                return (
                  <div 
                    onClick={() => this.pickContact(passive, item.type)} 
                    key={index} 
                    className="cursor-pointer flex items-center justify-between border-b border-gray-300 pb-5"
                  >
                    <div>
                      <p className="font-medium text-gray-700 text-base">{item.type}</p>
                      <p className="mt-px text-gray-700 text-sm">Hvem ønsker du å sende billetten til?</p>
                    </div>
                    <div className="bg-gray-300 flex items-center justify-center rounded-full p-2">
                      <span className="font-semibold text-gray-700 text-base">{item.tickets.active.length}/{passiveNum}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </React.Fragment>
      );
    }
  };

  render() {
    console.log(this.state.chooseTicketHolder);
    console.log(this.state.actives);
    console.log(this.state.ticketByType);
    return (
      <div className="w-full z-10 absolute bottom-0 h-auto bg-white rounded-t-md modal">
        <div className="">
          <HeaderSendTickets end={this.props.endSendingTickets}>
          </HeaderSendTickets>
          {this.reviewTicket()}
          <ContactListSendTicket 
            passiveTickets={this.state.chooseTicketHolder} 
            contactListShow={this.state.contactListShow} 
            contactList={this.props.contactList}
            addToActives={this.addToActives}
            removeFromActives={this.removeFromActives}>
          </ContactListSendTicket>
          <div className="px-5 pt-5 pb-6 bg-gray-100 modal-footer">
            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default SendTicketBS;
