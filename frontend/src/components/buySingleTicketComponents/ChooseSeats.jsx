import React, { Component } from 'react';
import Seats from '../Seats';
class ChooseSeats extends Component {
	render() {
		return (
			<div className={this.props.chooseSeat ? 'displayBlock' : 'displayNone'}>
				<div>tilbake til rutevalg</div>
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
