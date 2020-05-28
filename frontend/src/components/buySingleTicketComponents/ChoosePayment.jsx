import React, { Component } from 'react';
import PaymentOption from './PaymentOption';

class ChoosePayment extends Component {
	state = {
		paymentOptions: [
			{ type: 'card', selected: true },
			{ type: 'vipps', selected: false },
			{ type: 'newCard', selected: false },
		],
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

	render() {
		return (
			<div className={this.props.choosePayment ? 'block' : 'hidden'}>
				<div className="px-5 pb-5">
					<div
						className="flex flex-row items-center mb-5 cursor-pointer"
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
						<p className="text-sm font-medium">Tilbake til billettoversikt</p>
					</div>
					<div className="mt-6">
						<div className="text-center">
							<h1 className="text-gray-900 font-medium text-xl">Nesten ferdig! <br></br>Bekreft bestillingen</h1>
							<p className="text-gray-900 text-sm mt-5">Dere vil reise fra Oslo S til Gjøvik mandag, 9. desember, 15:40.</p>
						</div>
						<div className="mt-5">
							<div className="border-t border-gray-300 py-3 px-5">
								<div className="flex items-center justify-between">
									<p className="font-medium text-gray-900 text-sm">Totalbeløp</p>
									<p className="font-medium text-gray-900 text-sm">kr 672,00</p>
								</div>
							</div>
							<div className="border-t border-gray-300 py-3 px-5">
								<div className="flex items-center justify-between">
									<p className="text-gray-900 text-sm">Herav MVA</p>
									<p className="text-gray-900 text-sm">kr 53,76</p>
								</div>
							</div>
						</div>
						<div className="mt-6">
							<div>
							{this.state.paymentOptions.map((element, index) => (
								<PaymentOption
									key={index}
									option={element}
									isSelected={this.handleSelected}
								/>
							))}
							</div>
						</div>
					</div>
				</div>
				<div className="px-5 pt-5 pb-6 bg-gray-100 modal-footer">
					<button 
							onClick={() => {
								this.props.continueToConfirmation()
								this.props.submitNewOrder()
							}}
							className="p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400">
							Bekreft og betal bestillingen
					</button>
				</div>
			</div>
		);
	}
}

export default ChoosePayment;
