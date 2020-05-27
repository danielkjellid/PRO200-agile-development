import React, { Component } from "react";
import Contact from "../Contact";

class ContactListSendTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicks: 0
    };
  }

  render() {
    let passiveTicketArr;
    let content;

    if (this.props.contactListShow) {
      passiveTicketArr =  this.props.passiveTickets;
      content = (
        <div className="">
          <div
            className="flex flex-row items-center mb-5 cursor-pointer px-5"
            onClick={this.props.back}
          >
            <svg
              className="h-6 w-6 pr-2 text-gray-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium">Tilbake til billettoversikt</p>
          </div>
          <div className="px-5">
            <div className="rounded-md mt-5 mb-3 p-1 flex flex-row w-auto bg-gray-300">
                <button className="w-full bg-white mr-1 p-2 rounded text-sm font-medium text-gray-700">Kontakter</button>
                <button className="w-full bg-transparent ml-1 p-2 rounded text-sm font-medium text-gray-700">Grupper</button>
            </div>
            <div className="relative mb-5">
              <input className="py-2 pl-8 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Søk" />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-700">
                <svg className="w-4 h-4 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-200 px-5 py-1 border-b border-t border-gray-300 text-gray-700 uppercase text-sm font-bold">
              K
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
        </div>
      );
    }

    return(
        <div>{ content }</div>
    ) 
  }
}

export default ContactListSendTicket;