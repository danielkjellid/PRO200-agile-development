// framework imports
import React, { Component } from 'react';

// framework imports
import PaymentList from './PaymentList';


class Payment extends Component {
	state = {
		paymentOptions: [
			{type: 'card', selected: true},
			{type: 'vipps', selected: false},
			{type: 'newCard', selected: false},
		],
	};

    // method for selecting the clicked payment item
	handleSelected = (option) => {
		const paymentOptions = [...this.state.paymentOptions];
		const index = paymentOptions.indexOf(option);
		paymentOptions[index] = { ...option };
		paymentOptions.forEach((element) => (element.selected = false));
		paymentOptions[index].selected = paymentOptions[index].selected
			? false
			: true;

		this.setState({paymentOptions});
	};

	render() {
		let totalPriceOrder=0;
		return (
			<div className={this.props.choosePayment ? 'block' : 'hidden'}>
				<div className="px-5 pb-5">
					
					<div className="mt-6">
						<div className="text-center">
							<h1 className="text-gray-900 font-medium text-xl">Nesten ferdig! <br></br>Bekreft bestillingen</h1>
							<p className="text-gray-900 text-sm mt-5">Dere vil reise fra {this.props.startPoint} til {this.props.endPoint} fredag, 5. juni, 15:40.</p>
						</div>
						<div className="mt-5 pb-5 border-b border-gray-300">
							<div className="py-2">
                            {
                                this.props.numberOfTravellers.map((item, index) => {
                                    if(item.number>0){
                                        totalPriceOrder += item.totalPrice()
                                        return(
                                        <div key={index} className="flex items-center justify-between">
                                            <p className="font-regular text-gray-900 text-sm">{item.number} {item.type}</p>
                                            <p className="font-medium text-gray-900 text-sm">kr {item.totalPrice()}</p>
                                        </div>
                                        )
                                    }
							    })
                            }
							</div>
						</div>
						<div className="mt-5">
							<div className="py-2">
								<div className="flex items-center justify-between">
									<p className="font-medium text-gray-900 text-sm">Total <span className="text-gray-600 font-normal">(inkl MVA)</span></p>
									<p className="font-medium text-gray-900 text-sm">kr {totalPriceOrder},00</p>
								</div>
							</div>
							<div className="py-2">
								<div className="flex items-center justify-between">
									<p className="text-gray-900 text-sm">Herav MVA</p>
									<p className="text-gray-900 text-sm">kr 53,76</p>
								</div>
							</div>
						</div>
						<div className="mt-6">
							<div>
							{
								this.state.paymentOptions.map((element, index) => (
									<PaymentList
										key={index}
										option={element}
										isSelected={this.handleSelected}
									/>
								))
							}
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

export default Payment;
