import React, { Component } from 'react';
class ActiveTickets extends Component {

	formatPhone(value) {
		// clean the string
		const cleaned = ('' + value).replace(/\D/g, '')
		// split number into blocks
		const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})$/)

		if (match) {
				return '+47 ' + match[1] + ' ' + match[2] + ' ' + match[3]
		}

		return null
	}

	render() {
		if (this.props.activeTicket) {
			return (
				<div>
					<div className="relative h-10 w-10 bg-green-400 rounded-full shadow m-auto flex items-center justify-center">
						<svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-white">
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
						</svg>
					</div>
					<div className="bg-white shadow rounded-md -mt-5 text-center px-10 py-10">
						<div className="mb-4">
							<p className="text-gray-900 font-medium text-base">{this.props.ticket.type}</p>
							<p className="text-gray-600 font-medium text-base">{this.props.ticket.group}</p>
						</div>
						<div className="mb-4">
							<p className="text-gray-600 text-sm">Kjøpt for</p>
							<div className="flex items-center justify-center mt-2">
								<div className="h-8 w-8 rounded-full bg-red-400" />
								<div className="ml-2 text-left">
									<p className="text-gray-900 text-sm">{this.props.ticket.sharedWith.firstname + ' ' + this.props.ticket.sharedWith.lastname}</p>
									<p className="text-gray-700 text-xs">{this.formatPhone(this.props.ticket.sharedWith.mobile)}</p>
								</div>
							</div>
						</div>
						<div className="mb-4">
							<p className="text-gray-600 text-sm">Sone {this.props.ticket.zone}</p>
							<p className="text-gray-600 text-sm">Utgår X</p>
						</div>
						<div>
							<p className="text-gray-900 font-medium text-base">kr {this.props.ticket.price}</p>
						</div>
					</div>
				</div>
			)
		} else {
			return <div>Ingen aktive billetter</div>;
		}
	}
}

export default ActiveTickets;
