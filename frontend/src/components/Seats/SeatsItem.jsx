import React from 'react';
import selectedSeatIcon from '../../images/selectedSeat.png';
import availableSeatIcon from '../../images/availableSeat.png';
import occupiedSeatIcon from '../../images/occupiedSeat.png';

function SeatsItem(props) {

	const isSeatAvailable =() => {
		const { seat, selectedSeats, carriage } = props;

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

	return (
		<div>
			<img
				onClick={() =>
					props.onSelect(
						props.seat,
						props.row,
						props.carriage
					)
					}
				src={isSeatAvailable()}
				alt="SeatLogo"
			></img>
		</div>
	);
}

export default SeatsItem;
