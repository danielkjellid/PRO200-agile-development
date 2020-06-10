// framework imports
import React, { Component } from 'react';


// component that displays each contact in a contact list
class ContactItem extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	componentDidMount() {
		this.props.ticketByType.forEach(item => {
			if(item.type === this.props.currentType){
				item.tickets.forEach(item => {
					if(item.ticketHolderId === this.props.id){
						this.setState({active: true})
					}
				})
			}
		})
	}

	assignOrRemove = () => {
		if(!this.state.active) {
			this.props.assignContactToTicket(this.props.id);
			this.changeState()
		} else {
			this.props.removeContactFromTicket(this.props.id);
			this.changeState();
		}
	}

	changeState = () => {
		let status = this.state.active
		this.setState({active: !status})
	}

	getContactImage(name) {
		let sanitizeName = name.toLowerCase();

		return <img src={process.env.PUBLIC_URL + '/images/contacts/' + sanitizeName + '.jpeg'} alt={name} className="rounded-full w-10 h-10 border-2 border-gray-300"/>
	}

	render() {
		return (
			<div className="flex flex-row justify-between items-center py-4 border-b border-gray-300">
				<div className="flex flex-row ml-5">
					<div className="mr-3">
						{this.getContactImage(this.props.name)}
					</div>
					<div>
						<p className="text-gray-900 text-base">{this.props.name}</p>
						<p className="text-gray-700 text-sm">+47 {this.props.phone}</p>
					</div>
				</div>

				{/* Checkbox */}
				<div className="mr-5">
					<button
						onClick={this.assignOrRemove}
						className="w-6 h-6 rounded-full p-0 border border-gray-400"
					>
						{this.state.active ? (
							<svg
								className="w-full h-full text-green-700"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
									clipRule="evenodd"
									fillRule="evenodd"
								/>
							</svg>
						) : (
							''
						)}
					</button>
				</div>
			</div>
		);
	}
}

export default ContactItem;
