import React, { Component } from 'react';
class AddNewContactSendTicket extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	};

	handleFirstNameChange = (event) => {
		this.setState({ firstName: event.target.value });
	};

	handleLastNameChange = (event) => {
		this.setState({ lastName: event.target.value });
	};

	handlePhoneChange = (event) => {
		this.setState({ phoneNumber: event.target.value });
	};

	handleEmailChange = (event) => {
		this.setState({ email: event.target.value });
	};

	render() {
		return (
			<div className="mx-5 absolute bottom-0">
				<div className="bg-white rounded-md mb-3 p-6 text-center shadow-xl">
					<button onClick={this.props.changeHandler}>
						<svg className="cursor-pointer text-gray-700 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
					</button>
					<h2 className="text-lg font-medium mb-6">Send til telefonnummer</h2>
					<p className="text-xs text-gray-700 mb-6">
						Send billetten til en person som ikke er i kontaktlisten din ved å
						fylle inn telefonnummeret deres nedenfor.
					</p>
					<div className="">
						<p className="text-left text-xs font-medium pb-1 text-gray-800">
							Telefon
						</p>
						<input
							className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700"
							placeholder="Skriv inn telefonnummer..."
							onChange={this.handlePhoneChange}
						/>
					</div>
				</div>
				<button
					className="shadow-xl p-3 w-full bg-white text-center text-sm font-medium text-black rounded-md hover:cursor mb-6"
					onClick={() => {
						this.props.changeHandler();
						this.props.sendSMS(this.state);
					}}
				>
					Send til telefonnummer
				</button>
			</div>
		);
	}
}

export default AddNewContactSendTicket;
