import React, { Component } from 'react';
import logo from '../images/boughtTicketIcon.png';

class ActiveTickets extends Component {
	myStyle = {
		textAlign: 'center',
	};

	periodOrSingle() {
		return this.props.singleTicket ? 'Enkeltbillett' : 'Periodebillett';
	}

	render() {
		const { singleTicket, periodTicket } = this.props;
		if (singleTicket || periodTicket) {
			return (
				<div style={this.myStyle}>
					<img src={logo} alt="boughtTicketIcon"></img>
					<h3>{this.periodOrSingle()}</h3>
					<h4>Type bruker</h4>
					<p>Kjøpt for Anne Siri Bjørnson</p>
					<p>Sone 1</p>
					<p>Utgår 22.12.2019 15:30</p>
					<p>199,00kr</p>
				</div>
			);
		} else {
			return <div>Ingen kjøpte billetter</div>;
		}
	}
}

export default ActiveTickets;
