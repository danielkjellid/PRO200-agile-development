import React, { Component } from 'react';
import Seat from './Seat';

class Seats extends Component {
	state = {
		seats: [
			[
				{ id: 1, status: 0 },
				{ id: 2, status: 0 },
				{ id: 3, status: 1 },
				{ id: 4, status: 0 },
				{ id: 5, status: 0 },
				{ id: 6, status: 1 },
				{ id: 7, status: 1 },
				{ id: 8, status: 0 },
				{ id: 9, status: 0 },
				{ id: 10, status: 1 },
				{ id: 11, status: 1 },
				{ id: 12, status: 0 },
				{ id: 13, status: 1 },
				{ id: 14, status: 1 },
				{ id: 15, status: 1 },
			],
			[
				{ id: 16, status: 0 },
				{ id: 17, status: 1 },
				{ id: 18, status: 1 },
				{ id: 19, status: 1 },
				{ id: 20, status: 1 },
				{ id: 21, status: 1 },
				{ id: 22, status: 1 },
				{ id: 23, status: 1 },
				{ id: 24, status: 1 },
				{ id: 25, status: 1 },
				{ id: 26, status: 0 },
				{ id: 27, status: 0 },
				{ id: 28, status: 1 },
				{ id: 29, status: 1 },
				{ id: 30, status: 1 },
			],
			[
				{ id: 31, status: 1 },
				{ id: 32, status: 1 },
				{ id: 33, status: 1 },
				{ id: 34, status: 1 },
				{ id: 35, status: 0 },
				{ id: 36, status: 1 },
				{ id: 37, status: 1 },
				{ id: 38, status: 1 },
				{ id: 39, status: 0 },
				{ id: 40, status: 1 },
				{ id: 41, status: 1 },
				{ id: 42, status: 0 },
				{ id: 43, status: 1 },
				{ id: 44, status: 0 },
				{ id: 45, status: 0 },
			],
			[
				{ id: 46, status: 0 },
				{ id: 47, status: 1 },
				{ id: 48, status: 1 },
				{ id: 49, status: 1 },
				{ id: 50, status: 0 },
				{ id: 51, status: 1 },
				{ id: 52, status: 1 },
				{ id: 53, status: 1 },
				{ id: 54, status: 0 },
				{ id: 55, status: 1 },
				{ id: 56, status: 0 },
				{ id: 57, status: 0 },
				{ id: 58, status: 1 },
				{ id: 59, status: 1 },
				{ id: 60, status: 1 },
			],
		],
	};

	gridLayout = {
		display: 'grid',
		gridTemplateColumns: '25px 25px 25px',
		gridGap: '10px',
	};

	mainGridLayout = {
		display: 'grid',
		padding: '50px',
		gridTemplateColumns: 'auto auto',
		gridRowGap: '50px',
	};

	handleSelectSeat = (seat, row) => {
		const seats = [...this.state.seats];
		const index = seats[row].indexOf(seat);
		seats[row][index] = { ...seat };
		if (seat.status === 1) {
			seats[row][index].status = 2;
		} else if (seat.status === 2) {
			seats[row][index].status = 1;
		}

		this.setState({ seats });
	};

	render() {
		return (
			<div style={this.mainGridLayout}>
				{this.state.seats.map((row, i) => (
					<div style={this.gridLayout} key={i}>
						{row.map((col, j) => (
							<Seat
								key={col.id}
								row={i}
								seat={col}
								onSelect={this.handleSelectSeat}
							></Seat>
						))}
					</div>
				))}
			</div>
		);
	}
}

export default Seats;
