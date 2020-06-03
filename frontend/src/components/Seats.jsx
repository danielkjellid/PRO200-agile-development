import React, { Component } from 'react';
import Seat from './Seat';

class Seats extends Component {
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

	handleSelectSeat = (seat, row, carriage) => {
		if (seat.taken) {
			return;
		}
		const numberOfTravellers = this.props.tickets.length;
		const selectedSeats = this.props.selectedSeats;

		let alreadySelected = false;

		selectedSeats.forEach((element, index) => {
			if (element.seat.id === seat.id && element.carriage === carriage) {
				selectedSeats.splice(index, 1);
				return (alreadySelected = true);
			}
		});

		if (!alreadySelected) {
			if (selectedSeats.length < numberOfTravellers) {
				selectedSeats.push({
					seat: seat,
					row: row,
					carriage: this.props.carriageValue,
				});
			} else {
				return;
			}
		}
		this.props.setSelectedSeats(selectedSeats);
	};

	checkForRow(row) {
		if (row === 5) {
			return <div style={this.gridSpacingItem} />;
		}
	}

	choosenSeatText() {
		const { selectedSeats } = this.props;

		if (selectedSeats.length === 0) {
			return (
				<div className="m-auto text-center">
					<p className="text-sm text-gray-900 font-medium">Velg sete</p>
				</div>
			);
		}

		var instances = selectedSeats
			.map((element) => element)
			.reduce((values, val) => {
				if (val.carriage in values) {
					if (val.row in values[val.carriage])
						values[val.carriage][val.row].push(val.seat);
					else {
						values[val.carriage][val.row] = [];
						values[val.carriage][val.row].push(val.seat);
					}
				} else {
					values[val.carriage] = {};
					values[val.carriage][val.row] = [];
					values[val.carriage][val.row].push(val.seat);
				}

				return values;
			}, {});

		const text = [];

		for (let [carriage, value] of Object.entries(instances)) {
			text.push(
				<p
					style={{ textAlign: 'center' }}
					className="text-sm text-gray-900 font-medium"
					key={carriage}
				>
					{this.retrieveCarriageText(carriage)}
				</p>
			);
			for (let [row, seat] of Object.entries(value)) {
				text.push(
					<p
						style={{ textAlign: 'center' }}
						className="text-sm text-gray-900 font-medium"
						key={row}
					>
						{this.renderSeatText(row, seat)}
					</p>
				);
			}
		}

		return text;
	}

	retrieveCarriageText(carriage) {
		switch (carriage) {
			case 'carriage1':
				return 'Vogn 1';
			case 'carriage2':
				return 'Vogn 2';
			case 'carriage3':
				return 'Vogn 3';
			default:
				return 'Error: not finding carriage';
		}
	}

	renderSeatText(row, seat) {
		return (
			'Rad ' +
			++row +
			', sete' +
			seat.map((element, index) => {
				if (index === seat.length - 1) {
					return ' ' + element.id + ' ';
				} else {
					return ' ' + element.id;
				}
			})
		);
	}

	render() {
		return (
			<div style={this.mainGridLayout}>
				{this.props.carriage.map((row, i) => (
					<div style={this.gridLayout} key={i}>
						{this.checkForRow(i)}
						{row.map((col, j) => {
							if (j === 3) {
								return (
									<React.Fragment key={col.id}>
										<div />
										<Seat
											key={col.id}
											selectedSeats={this.props.selectedSeats}
											row={i}
											carriage={this.props.carriageValue}
											seat={col}
											onSelect={this.handleSelectSeat}
										/>
									</React.Fragment>
								);
							} else {
								return (
									<Seat
										key={col.id}
										selectedSeats={this.props.selectedSeats}
										row={i}
										seat={col}
										carriage={this.props.carriageValue}
										onSelect={this.handleSelectSeat}
									/>
								);
							}
						})}
					</div>
				))}
				<div className="pt-5">
					{this.choosenSeatText()}
					<div className="mt-3 flex items-center">
						<div className="flex items-center mr-4">
							<svg
								className="mr-2 h-5 w-5 text-gray-500"
								viewBox="0 0 22 23"
								fill="CurrentColor"
							>
								<path d="M20.5198 7.39968C19.9082 7.39968 19.4126 7.89528 19.4126 8.50704V16.0752C19.3445 16.0987 19.2758 16.1182 19.2096 16.1503C19.1902 16.1592 18.1502 16.6567 16.4722 17.1214C15.9379 16.7467 15.2592 16.5797 14.5682 16.7134C12.0293 17.2058 9.56544 17.2121 7.0296 16.729C6.3456 16.6001 5.67456 16.764 5.14392 17.1322C3.47136 16.6682 2.43528 16.1688 2.40456 16.1539C2.3424 16.1232 2.27832 16.1047 2.21448 16.0826V8.50656C2.21448 7.89528 1.71888 7.3992 1.10712 7.3992C0.4956 7.3992 0 7.89504 0 8.50656V17.5493C0 17.6026 0.00816003 17.6527 0.01536 17.7038C0.0384 18.2911 0.3648 18.8491 0.92832 19.1292C1.02384 19.1762 2.31528 19.8079 4.3764 20.3686C4.72152 21.0007 5.33568 21.4788 6.09816 21.6245C7.65768 21.9209 9.2232 22.0716 10.7527 22.0716C12.3178 22.0716 13.9207 21.9144 15.517 21.605C16.2713 21.4594 16.879 20.987 17.2231 20.3635C19.2811 19.8058 20.5759 19.1801 20.6717 19.133C21.1966 18.8755 21.5213 18.378 21.5849 17.838C21.6098 17.7456 21.6278 17.6498 21.6278 17.5495V8.50656C21.6276 7.89528 21.1315 7.39968 20.5198 7.39968ZM3.78936 7.95312L3.78912 14.9352C4.00944 15.0204 4.27728 15.1202 4.59816 15.2268C5.45664 14.7919 6.46032 14.6441 7.4196 14.8255C9.73032 15.2664 11.905 15.2609 14.2258 14.8104C15.1942 14.6232 16.1954 14.7708 17.0563 15.2042C17.3515 15.1056 17.6021 15.0139 17.8126 14.9326L17.8166 7.95264C17.8166 6.70512 18.7406 5.67864 19.939 5.4984V2.1228C19.939 1.51128 19.4765 1.2228 18.8318 1.0152C18.8318 1.0152 15.3214 0 10.8722 0C6.42192 0 2.77488 1.0152 2.77488 1.0152C2.14632 1.21056 1.66752 1.5108 1.66752 2.1228V5.49864C2.86536 5.67888 3.78936 6.7056 3.78936 7.95312Z" />
							</svg>
							<p className="text-sm text-gray-700">Ledig</p>
						</div>
						<div className="flex items-center">
							<svg
								className="mr-2 h-5 w-5 text-gray-300"
								viewBox="0 0 22 23"
								fill="CurrentColor"
							>
								<path d="M20.5198 7.39968C19.9082 7.39968 19.4126 7.89528 19.4126 8.50704V16.0752C19.3445 16.0987 19.2758 16.1182 19.2096 16.1503C19.1902 16.1592 18.1502 16.6567 16.4722 17.1214C15.9379 16.7467 15.2592 16.5797 14.5682 16.7134C12.0293 17.2058 9.56544 17.2121 7.0296 16.729C6.3456 16.6001 5.67456 16.764 5.14392 17.1322C3.47136 16.6682 2.43528 16.1688 2.40456 16.1539C2.3424 16.1232 2.27832 16.1047 2.21448 16.0826V8.50656C2.21448 7.89528 1.71888 7.3992 1.10712 7.3992C0.4956 7.3992 0 7.89504 0 8.50656V17.5493C0 17.6026 0.00816003 17.6527 0.01536 17.7038C0.0384 18.2911 0.3648 18.8491 0.92832 19.1292C1.02384 19.1762 2.31528 19.8079 4.3764 20.3686C4.72152 21.0007 5.33568 21.4788 6.09816 21.6245C7.65768 21.9209 9.2232 22.0716 10.7527 22.0716C12.3178 22.0716 13.9207 21.9144 15.517 21.605C16.2713 21.4594 16.879 20.987 17.2231 20.3635C19.2811 19.8058 20.5759 19.1801 20.6717 19.133C21.1966 18.8755 21.5213 18.378 21.5849 17.838C21.6098 17.7456 21.6278 17.6498 21.6278 17.5495V8.50656C21.6276 7.89528 21.1315 7.39968 20.5198 7.39968ZM3.78936 7.95312L3.78912 14.9352C4.00944 15.0204 4.27728 15.1202 4.59816 15.2268C5.45664 14.7919 6.46032 14.6441 7.4196 14.8255C9.73032 15.2664 11.905 15.2609 14.2258 14.8104C15.1942 14.6232 16.1954 14.7708 17.0563 15.2042C17.3515 15.1056 17.6021 15.0139 17.8126 14.9326L17.8166 7.95264C17.8166 6.70512 18.7406 5.67864 19.939 5.4984V2.1228C19.939 1.51128 19.4765 1.2228 18.8318 1.0152C18.8318 1.0152 15.3214 0 10.8722 0C6.42192 0 2.77488 1.0152 2.77488 1.0152C2.14632 1.21056 1.66752 1.5108 1.66752 2.1228V5.49864C2.86536 5.67888 3.78936 6.7056 3.78936 7.95312Z" />
							</svg>
							<p className="text-sm text-gray-700">Opptatt</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Seats;
