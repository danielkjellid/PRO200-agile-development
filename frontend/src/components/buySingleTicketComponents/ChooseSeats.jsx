import React, { Component } from 'react';
import Seats from '../Seats';
class ChooseSeats extends Component {
	render() {
		return (
			<div className={this.props.chooseSeat ? 'displayBlock' : 'displayNone'}>
				<div className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer" onClick={this.props.back}>
					<svg className="h-6 w-6 pr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/></svg>
					<p className="text-sm font-medium">Tilbake</p>
				</div>
				<br></br>
				<div style={{ textAlign: 'center' }}>
					<select onchange="">
						<option value="Cat1">Vogn 1</option>
						<option value="Cat2">Vogn 2</option>
						<option value="Cat3">Vogn 3</option>
					</select>
				</div>
				<br></br>
				<Seats tickets={this.props.tickets} />
				<button
					onClick={this.props.continueToPayment}
					className="fortsettButton fortsettButtonActive"
				>
					Fortsett til betaling
				</button>
			</div>
		);
	}
}

export default ChooseSeats;
