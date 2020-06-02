import React, { Component } from 'react';
class AddNewContactSendTicket extends Component {
    state = {
            firstName:"",
            lastName:"",
            email:"",
            phoneNumber:""
      }
    handleFirstNameChange = (event) => {
        this.setState({firstName: event.target.value})
    }  
    
    handlePhoneChange = (event) => {
        this.setState({phoneNumber: event.target.value})
    }  
    render() {
        return (
            <div className="mx-5 absolute bottom-0">
                <div className="bg-white rounded-md mb-3 p-6 text-center shadow-xl">
                    <h2 className="text-lg font-medium mb-6">Legg til en ny kontakt</h2>
                    <p className="text-xs text-gray-700 mb-6">Legg til ny kontakt med navn og telefonnummer. Hvis telefonnummeret er koblet til en Vy konto, vil sendte billetter dukke opp i deres app.</p>
                    <div className="mb-3">
                        <p className="text-left text-xs font-medium pb-1 text-gray-800">Navn</p>
                        <input className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Skriv inn navn..." onChange={this.handleFirstNameChange} />
                    </div>
                    <div>
                        <p className="text-left text-xs font-medium pb-1 text-gray-800">Telefon</p>
                        <input className="px-3 py-2 w-full border rounded border-gray-400 text-sm text-gray-700" placeholder="Skriv inn telefonnr..." onChange={this.handlePhoneChange} />
                    </div>
                </div>
                
                <button className="shadow-xl p-3 w-full bg-white text-center text-sm font-medium text-black rounded-md hover:cursor mb-6" onClick={this.props.changeHandler}>Legg til kontakt</button>
            </div>
        );
    }
}

export default AddNewContactSendTicket;