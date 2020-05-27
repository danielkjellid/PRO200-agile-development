import React, { Component } from "react";
import Contact from "../Contact";

class ContactListSendTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chosenTicketHoldersId:''
    };
  }


  getChosenTicketHoldersId = (array) => {
    this.setState({chosenTicketHoldersId: array})
  }

  

  render() {
    let passiveTicketArr;
    let content;

    if (this.props.contactListShow) {
      passiveTicketArr =  this.props.passiveTickets;
      console.log(this.props.contactList);
      content = (
        <div className="">
          <p>Tilbake til billettoversikt</p>
          <div className="rounded-md mx-5 mt-5 mb-3 p-1 flex flex-row w-auto bg-gray-300">
							<button className="w-full bg-white mr-1 p-2 rounded text-sm font-medium text-gray-700">Kontakter</button>
							<button className="w-full bg-transparent ml-1 p-2 rounded text-sm font-medium text-gray-700">Grupper</button>
          </div>
          <div className="relative mb-5 mx-5">
            <input className="py-2 pl-8 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Søk" />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
              <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          {this.props.contactList.map((item, index) => {
            return (
              <Contact
                addToActives={this.props.addToActives}
                removeFromActives={this.props.removeFromActives}
                key={index}
                id={item.id}
                name={item.firstName}
                lastName={item.lastName}
                phone={item.phoneNumber}
    
              ></Contact>
            );
          })}
        </div>
      );
    }

    return(
        <div>{ content }</div>
    ) 
  }
}

export default ContactListSendTicket;