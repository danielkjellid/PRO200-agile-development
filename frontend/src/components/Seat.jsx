import React, { Component } from 'react';
import selectedSeatIcon from '../images/selectedSeat.png';
import availableSeatIcon from '../images/availableSeat.png';
import occupiedSeatIcon from '../images/occupiedSeat.png';

class Seat extends Component {
	isSeatAvailable() {
		const { seat, selectedSeats, carriage } = this.props;

		if (selectedSeats.length !== 0) {
			var isSelected = false;
			selectedSeats.forEach((element) => {
				if (element.seat.id === seat.id && element.carriage === carriage) {
					return (isSelected = true);
				}
			});

			if (isSelected) {
				return selectedSeatIcon;
			}
		}

		if (seat.taken) {
			return occupiedSeatIcon;
		} else if (!seat.taken) {
			return availableSeatIcon;
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<img
					onClick={() =>
						this.props.onSelect(
							this.props.seat,
							this.props.row,
							this.props.carriage
						)
					}
					src={this.isSeatAvailable()}
					alt="SeatLogo"
				></img>
			</div>
		);
	}
}

export default Seat;
