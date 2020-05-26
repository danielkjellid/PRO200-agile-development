import React, { Component } from 'react';
import Seat from './Seat';

class Seats extends Component {
	state = {
		selectedSeats: [],
	};

	gridLayout = {
		display: 'grid',
		gridTemplateColumns: '25px 25px 25px 50px 25px 25px 25px',
		columnGap: '10px',
	};

	mainGridLayout = {
		display: 'grid',
		rowGap: '10px',
		justifyItems: 'center',
	};

	gridSpacingItem = {
		height: '25px',
		gridColumnStart: '1',
		gridColumnEnd: '8',
	};

	handleSelectSeat = (seat, row) => {
		if (seat.taken) {
			return;
		}

		const numberOfTravellers = this.props.tickets.length;
		const seats = [...this.props.carriage];
		var index = seats[row].indexOf(seat);
		seats[row][index] = { ...seat };

		const selectedSeats = this.selectAvailableSeats(
			seats,
			row,
			index,
			numberOfTravellers
		);

		this.setState({ selectedSeats });
	};

	selectAvailableSeats(seats, row, index, numberOfTravellers) {
		const selectedSeats = [];

		const intitialTravellers = numberOfTravellers;

		for (var i = 0; i < numberOfTravellers; i++) {
			const availableSeat = this.isSeatOccupied(seats, row, index + i);

			selectedSeats.push({
				seat: seats[availableSeat.row][availableSeat.index],
				row: availableSeat.row,
			});
			index = availableSeat.index - i;
			row = availableSeat.row;
		}

		return selectedSeats;
	}

	isSeatOccupied(seats, row, index) {
		console.log('row: ', row, 'index: ', index);
		if (index >= seats[row].length) {
			if (row + 1 >= seats.length) {
				row = 0;
				index = 0;
			} else {
				row++;
				index = 0;
			}
			if (seats[row][index].taken) {
				console.log('is occupied');
				return this.isSeatOccupied(seats, row, index);
			} else {
				console.log('is available');
				return { row: row, index: index };
			}
		} else {
			if (seats[row][index].taken) {
				console.log('is occupied');
				return this.isSeatOccupied(seats, row, index + 1);
			} else {
				console.log('is available');
				return { row: row, index: index };
			}
		}
	}
	checkForRow(row) {
		if (row === 5) {
			return <div style={this.gridSpacingItem} />;
		}
	}

	choosenSeatText() {
		const { selectedSeats } = this.state;

		if (selectedSeats.length === 0) {
			return <div>Velg sete</div>;
		}

		return (
			<div>
				Rad {selectedSeats[0].row + 1}, sete
				{selectedSeats.map((element) => {
					if (selectedSeats.indexOf(element) === selectedSeats.length - 1) {
						return ' ' + element.seat.id + ' ';
					} else {
						return ' ' + element.seat.id + ', ';
					}
				})}
				valgt
			</div>
		);
	}

	render() {
		return (
			<div style={this.mainGridLayout}>
				{console.log(this.props.carriage)}
				{this.props.carriage.map((row, i) => (
					<div style={this.gridLayout} key={i}>
						{this.checkForRow(i)}
						{row.map((col, j) => {
							if (j === 3) {
								return (
									<React.Fragment>
										<div />
										<Seat
											key={col.id}
											selectedSeats={this.state.selectedSeats}
											row={i}
											seat={col}
											onSelect={this.handleSelectSeat}
										></Seat>
									</React.Fragment>
								);
							} else {
								return (
									<Seat
										key={col.id}
										selectedSeats={this.state.selectedSeats}
										row={i}
										seat={col}
										onSelect={this.handleSelectSeat}
									></Seat>
								);
							}
						})}
					</div>
				))}
				{this.choosenSeatText()}
			</div>
		);
	}
}

export default Seats;
