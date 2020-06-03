import React, { Component } from 'react';

class TicketItem extends Component {

	constructor(props) {
		super(props)
		this.state = {
			dataLoaded: false,
			ticketOpen: false,
			ticket: [],
		}
	}

	getTicket = async(id) => {
		if(!this.state.dataLoaded) {
			try {
				const response = await fetch(`https://localhost:5001/orders/${id}/basictickets`)
				const payload = await response.json()
				this.setState({
					ticket: payload,
					dataLoaded: true
				})
			} catch(error) {
				console.log(error)
			}
		}
	}

	// fetchTicketsByOrder = async (id) => {
	// 				if(!this.state.fetchAPI){
	// 						try {
	// 								const response = await fetch(
	// 										`https://localhost:5001/orders/${id}/basictickets`
	// 								);
	// 								const payload = await response.json();
	// 								this.setState({
	// 										tickets: payload,
	// 										fetchAPI: true
	// 								})
	// 						} catch(err) {
	// 								console.log(err);
	// 						}
	// 				}
	// 		}

	// 				showTickets = () => {
	// 						let showTicket = this.state.open;
	// 						this.setState({open: !showTicket});
	// 				}

	// 				searchContact = (id) => {
	// 						let contactArr = this.props.contactList.find((item) => item.id === id)
	// 						return contactArr ? contactArr.firstName : ""
	// 				}

	// 				renderTicketsByOrder = () => {

	// 						return (this.state.tickets.map((item, index) => {
	// 								return (
	// 										<div key={index}>
	// 												<p>Billett holder: {this.searchContact(item.ticketHolderId)}</p>
	// 												<p>Type: {item.type}</p>
	// 												<p>Fra: {item.startPoint}</p>
	// 												<p>Til: {item.endPoint}</p>
	// 												<p>Pris: {item.price}</p>
	// 										</div>
	// 								)
	// 						}))

	// }

	// 		render() {
	// 						return (
	// 										<div onClick={() => {this.fetchTicketsByOrder(this.props.id); this.showTickets()} } className="p-8 border border-gray-300 rounded-md font-medium text-gray-700">
	// 														<h4>{this.props.itemName}</h4>
	// 														<div style={{display: this.state.open ? 'block' : 'none'}}>
	// 																{this.state.tickets ? this.renderTicketsByOrder() : null}
	// 														</div>
	// 							</div>
	// 						);
	// 		}

	renderTicket() {
		this.getTicket(this.props.id)
		
		return (
			<div>
				<div>
					<div className="px-2 py-2">
						<div className="flex items-center">
							<div className={this.props.active ? "bg-green-400 rounded-full h-24 w-2" : "bg-red-400 rounded-full h-24 w-2"}>
								{/* Empty div to create left border */}
							</div>
							<div className="ml-4 w-full pr-2">
								<div className="flex justify-between items-center">
									<p className="font-medium text-base text-gray-900">{this.props.title}</p>
									<p className="font-medium text-sm text-gray-900">kr {this.props.price}</p>
								</div>
								<div className="mt-2 flex justify-between items-center">
									<p className="text-gray-700 text-sm">Fra <span className="font-medium text-sm text-gray-900">{this.props.from}</span> til <span className="font-medium text-sm text-gray-900">{this.props.to}</span></p>
									<div className="flex">
										{/* Colors to be replaces with images  */}
										<div className="h-8 w-8 border-2 border-white bg-red-200 rounded-full"></div>
										<div className="h-8 w-8 border-2 border-white bg-red-300 rounded-full -ml-2"></div>
										<div className="h-8 w-8 border-2 border-white bg-red-400 rounded-full -ml-2"></div>
										<div className="h-8 w-8 border-2 border-white bg-red-500 rounded-full -ml-2"></div>
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

export default TicketItem
