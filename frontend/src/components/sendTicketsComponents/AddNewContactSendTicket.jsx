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
            <div>
                <h2>Legg til en ny kontakt</h2>
                <p>Legg til ny kontakt med navn og telefonnummer. Hvis telefonnummeret er koblet til en Vy konto, vil sendte billetter dukke opp i deres app.</p>
                <input placeholder="Navn" onChange={this.handleFirstNameChange} />
                <input placeholder="Telefon" onChange={this.handlePhoneChange} />
                <button onClick={this.props.changeHandler}>Add</button>
            </div>
        );
    }
}

export default AddNewContactSendTicket;