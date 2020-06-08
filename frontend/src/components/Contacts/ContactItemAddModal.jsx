import React, { Component } from 'react';
class ContactItemAddModal extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	};

	handleFirstNameChange = (event) => {
		this.setState({firstName: event.target.value});
	};

	handleLastNameChange = (event) => {
		this.setState({lastName: event.target.value});
	};

	handlePhoneChange = (event) => {
		this.setState({phoneNumber: event.target.value});
	};

	handleEmailChange = (event) => {
		this.setState({email: event.target.value});
	};

	render() {

		return (
			<React.Fragment>
				<div className="w-full h-full z-10 block fixed bottom-0 bg-black opacity-25"></div>
				<div className="z-30 mx-5 absolute bottom-0">
					<div className="bg-white rounded-md mb-3 p-6 text-center shadow-xl">
						<div className="flex flex-row justify-end">
							<svg onClick={this.props.changeHandler} className="cursor-pointer h-4 w-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"/></svg>
						</div>
						<h2 className="text-lg font-medium mb-6">Send til telefonnummer</h2>
						<p className="text-sm text-gray-700 mb-6">
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
			</React.Fragment>
		);
	}
}

export default ContactItemAddModal;
