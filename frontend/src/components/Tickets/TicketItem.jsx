// framework imports
import React, { Component } from 'react';


// component for each ticket item - showing both compressed and expanded info about a certain ticket
class TicketItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,
            ticketExpanded: false,
            newNameValue: "",
        }
    }

    // method to show more information about the ticket by expanding it
	expandTicket() {
		let expandedTicket = this.state.ticketExpanded;
		this.setState({ ticketExpanded: !expandedTicket });
	}

    // method for getting the contacts associated with a trip
	getTripParticipants = (id) => {
		let contacts = this.props.contactList.find((contact) => contact.id === id);
		return contacts ? contacts.firstName : ""
	}

	onKeydown = (event) => {
		if (event.key === 'Enter') {
			this.expandTicket()
		}
	}

	renderTicket() {		
		return (
			<div>
				<div tabIndex="0" aria-label={'Ticket for ' + this.props.title} onKeyDown={this.onKeydown} onClick={() => this.expandTicket()} >
					<div className="px-2 py-2">
						<div  className="flex items-center">
							<div style={this.state.ticketExpanded ? { height: 414 + 'px'}  : { height: 96 + 'px' }} className={this.props.active ? "bg-green-400 rounded-full h-64 w-2" : "bg-red-400 rounded-full h-24 w-2"}>
								{/* Empty div to create left border */}
							</div>
							<div className={this.state.ticketExpanded ? "hidden" : "block ml-4 w-full pr-2"}>
								<div className="flex justify-between items-center">
									<p className="font-medium text-base text-gray-900 truncate w-3/4">{this.props.title}</p>
									<p className="font-medium text-sm text-gray-900">kr {this.props.price}</p>
								</div>
								<div className="mt-2 flex justify-between items-center">
									<div>
										<p className="text-gray-700 text-sm">Fra <span className="font-medium text-sm text-gray-900">{this.props.from}</span> til <span className="font-medium text-sm text-gray-900">{this.props.to}</span></p>
									</div>
									<div className="flex">
										{/* Colors to be replaces with images  */}
										<div className="h-8 w-8 border-2 border-white bg-red-200 rounded-full"></div>
										<div className="h-8 w-8 border-2 border-white bg-red-300 rounded-full -ml-2"></div>
										<div className="h-8 w-8 border-2 border-white bg-red-400 rounded-full -ml-2"></div>
										<div className="h-8 w-8 border-2 border-white bg-red-500 rounded-full -ml-2"></div>
									</div>
								</div>
							</div>
							<div className={this.state.ticketExpanded ? "block ml-4 w-full pr-2" : "hidden"}>
								<div  className="flex justify-between items-start border-b border-gray-300 pb-5 pt-5">
									<div onClick={() => this.expandTicket()}>
										
										<p className="font-medium text-base text-gray-900">{this.props.title}</p>
										
										<div className="flex mt-1">
											{/* Colors to be replaces with images  */}
											<div className="h-8 w-8 border-2 border-white bg-red-200 rounded-full"></div>
											<div className="h-8 w-8 border-2 border-white bg-red-300 rounded-full -ml-2"></div>
											<div className="h-8 w-8 border-2 border-white bg-red-400 rounded-full -ml-2"></div>
											<div className="h-8 w-8 border-2 border-white bg-red-500 rounded-full -ml-2"></div>
										</div>
									</div>
									<button onClick={() => this.props.changeOrderName(this.props.id)} className="bg-white text-gray-900 text-sm font-medium rounded-lg px-4 py-3 hover:bg-gray-100 border border-gray-300">Rediger</button>
								</div>
								<div className="flex items-center justify-between pt-6 pb-5 border-b border-gray-300">
									<div>
										<p className="text-gray-800 text-base font-medium">{this.props.from}</p>
										<p className="mt-2 text-gray-800 text-xl font-bold">21:44</p>
										<p className="mt-2 text-gray-700 text-sm">Spor 11</p>
									</div>
									<div className="text-center">
										<p className="text-gray-700 text-sm">2 timer</p>
										<span className="mt-5 block px-2 py-2 border border-vy-green-300 rounded-md text-vy-green-300">R30x</span>
									</div>
									<div>
										<p className="text-gray-800 text-base font-medium">{this.props.to}</p>
										<p className="mt-2 text-gray-800 text-xl font-bold">23:34</p>
										<p className="mt-2 text-gray-700 text-sm">6 stopp</p>
									</div>
								</div>
								<div className="pt-6 pb-6">
                                    {
                                        this.props.tickets.map((item, index) => {
                                            return (
                                                <div key={index} className="flex items-center justify-between">
                                                    <p className="text-gray-900 text-sm">1x {item.type}</p>
                                                    <p className="text-gray-900 text-sm">kr {item.price}</p>
                                                </div>
                                            )
                                        })
                                    }
									<div className="mt-5 flex items-center justify-between">
										<p className="text-gray-900 text-sm font-medium">Total <span className="text-gray-600 font-normal">(inkl MVA)</span></p>
										<p className="text-gray-900 text-sm font-medium">kr {this.props.price}</p>
									</div>
									<div className="mt-3 flex items-center justify-between">
										<p className="text-gray-900 text-sm">Herav MVA</p>
										<p className="text-gray-900 text-sm">kr 168,00</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
        return (
            <div>
                {this.renderTicket()}
            </div>
        )
	}
}

export default TicketItem;
