import React, { Component } from 'react';
import selectedSeatIcon from '../images/selectedSeat.png';
import availableSeatIcon from '../images/availableSeat.png';
import occupiedSeatIcon from '../images/occupiedSeat.png';

class Seat extends Component {
	isSeatAvailable() {
		const { status } = this.props.seat;

		if (status === 2) {
			return selectedSeatIcon;
		} else if (!status) {
			return occupiedSeatIcon;
		} else if (status === 1) {
			return availableSeatIcon;
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<img
					onClick={() => this.props.onSelect(this.props.seat, this.props.row)}
					src={this.isSeatAvailable()}
					alt="SeatLogo"
				></img>
			</div>
		);
	}
}

export default Seat;
