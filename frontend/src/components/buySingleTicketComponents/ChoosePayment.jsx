import React, { Component } from 'react';
import PaymentOption from './PaymentOption';

class ChoosePayment extends Component {
	state = {
		paymentOptions: [
			{ type: 'card', selected: false },
			{ type: 'vipps', selected: false },
			{ type: 'newCard', selected: false },
		],
	};

	renderCost = () => {
		const text = [
			['Totalbeløp', '672,00kr'],
			['herav MVA', '53,76kr'],
		];
		const elements = [];

		text.forEach((element, index) => {
			elements.push(
				<div
					key={index}
					style={{
						borderTop: '1px solid lightGray',
						padding: '8px',
					}}
				>
					<p style={{ float: 'left' }}>{element[0]}</p>
					<p style={{ float: 'right' }}>{element[1]}</p>
				</div>
			);
			if (index !== text.length - 1) {
				elements.push(<br key={index + 'br'}></br>);
			}
		});

		return elements;
	};

	handleSelected = (option) => {
		const paymentOptions = [...this.state.paymentOptions];
		const index = paymentOptions.indexOf(option);
		paymentOptions[index] = { ...option };
		paymentOptions.forEach((element) => (element.selected = false));
		paymentOptions[index].selected = paymentOptions[index].selected
			? false
			: true;

		this.setState({ paymentOptions });
	};

	mainGridContainer = {
		textAlign: 'center',
		paddingLeft: '25px',
		paddingRight: '25px',
		display: 'grid',
		gridTemplateRows: 'auto auto auto',
		rowGap: '20px',
	};

	payMentOptionContainer = {
		display: 'grid',
		gridTemplateRows: 'auto auto auto',
		rowGap: '10px',
		paddingBottom: '20px',
	};

	render() {
		return (
			<div
				className={this.props.choosePayment ? 'displayBlock' : 'displayNone'}
			>
				<div
					className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer"
					onClick={this.props.back}
				>
					<svg
						className="h-6 w-6 pr-2 text-gray-600"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
							fillRule="evenodd"
						/>
					</svg>
					<p className="text-sm font-medium">Tilbake</p>
				</div>
				<div style={this.mainGridContainer}>
					<div>
						<h1>Nesten ferdig!</h1>
						<h1>Bekreft bestillingen</h1>
					</div>
					<div>{this.renderCost()}</div>
					<div style={this.payMentOptionContainer}>
						{this.state.paymentOptions.map((element, index) => (
							<PaymentOption
								key={index}
								option={element}
								isSelected={this.handleSelected}
							/>
						))}
					</div>
				</div>
				<button
					onClick={() => {
						this.props.continueToConfirmation();
						this.props.submitNewOrder();
					}}
					className="fortsettButton fortsettButtonActive"
				>
					Bekreft og betal bestillingen
				</button>
			</div>
		);
	}
}

export default ChoosePayment;
