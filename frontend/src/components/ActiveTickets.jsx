import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ActiveTicket from './ActiveTicket';
import ActiveTicketDetails from './ActiveTicketDetails';

class ActiveTickets extends Component {
    constructor(props){
        super(props);
        this.state={
            activeTicketDetailsShow: false,
            activeTicketDetails: {
                //this state is a hardcoded active ticket. shall be deleted later
                type: "Enkeltbillett",
                group: "Student",
                sharedTicket: true,
                sharedWith: {
                  id: 7,
                  firstname: "Anne Siri",
                  lastname: "Bjørnson",
                  mobile: 45212345,
                },
                zone: 1,
                expires: new Date("May 21, 2020, 12:00:00"),
                price: 199,
              },
        }

        this.activeTicketHandler = this.activeTicketHandler.bind(this);
    }

    activeTicketHandler = () => {
        let activeTicketDetailsShow = this.state.activeTicketDetailsShow
        this.setState({activeTicketDetailsShow: !activeTicketDetailsShow})
        console.log("hei");
    }

    render() {

        const activeTicketDetailsShow = this.state.activeTicketDetailsShow;
        
        return (  
        <div>
            {!activeTicketDetailsShow ?
            <div className="px-5 py-10">
            {/* section */}
                <div>
                {/* section header */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg text-gray-900">Billetter</h2>
                        <Link to={"/tickets"}>
                        <div className="text-sm text-gray-900 flex items-center">
                            Se alle
                            <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            className="h-5 w-5 text-gray-600"
                            >
                            <path
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            />
                            </svg>
                        </div>
                        </Link>
                    </div>
            
                {/* section content */}
                <ActiveTicket
                    click={this.activeTicketHandler}
                    ticket={this.state.activeTicketDetails}
                />
                </div>     
            </div> : <ActiveTicketDetails click={this.activeTicketHandler}/>
        }    
        </div>
        
        
        );
    }
}

export default ActiveTickets;