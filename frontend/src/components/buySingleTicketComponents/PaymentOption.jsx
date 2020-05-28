import React, { Component } from 'react';
import Visa from '../../images/VISA.png';
import Vipps from '../../images/vipps.png';

class PaymentOption extends Component {
	payOptionSelected = {
		border: '1px solid green',
		borderRadius: '5px',
		backgroundColor: 'lightGreen',
	};

	payOptionDefault = {
		border: '1px solid lightGray',
		borderRadius: '5px',
	};

	getStyle = () => {
		return this.props.option.selected
			? this.payOptionSelected
			: this.payOptionDefault;
	};

	getText() {
		switch (this.props.option.type) {
			case 'card':
				return 'Kort **** 1234 utløper 11/22';
			case 'vipps':
				return 'Vipps';
			case 'newCard':
				return 'Nytt kort';
			default:
				return 'error';
		}
	}

	renderImage = () => {
		const style = {
			height: '25px',
			width: '50px',
		};

		switch (this.props.option.type) {
			case 'card':
				return <img style={style} src={Visa}></img>;
			case 'vipps':
				return <img style={style} src={Vipps}></img>;
			default:
				return null;
		}
	};

	render() {
		return (
			<div
				style={this.getStyle()}
				onClick={() => this.props.isSelected(this.props.option)}
			>
				<p style={{ padding: '8px', float: 'left' }}>
					<input
						type="checkbox"
						checked={this.props.option.selected}
						style={{ margin: '8px' }}
					/>
					{this.getText()}
				</p>
				<div style={{ float: 'right', padding: '10px' }}>
					{this.renderImage()}
				</div>
			</div>
		);
	}
}

export default PaymentOption;
