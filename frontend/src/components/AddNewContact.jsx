import React, { Component } from 'react';
class AddNewContactLater extends Component {
    state = { 
        name: '',
        lastName: '',
        email: '',
        phone: '',
    }
    render() {
        return (
            <div>
                <input placeholder="Først navn" onChange={e => this.setState({name: e.target.value})}/>
                <input placeholder="Etternavn" onChange={e => this.setState({lastName: e.target.value})}/>
                <input placeholder="Email" onChange={e => this.setState({email: e.target.value})}/>
                <input placeholder="Mobil" onChange={e => this.setState({phone: e.target.value})}/>
                <button onClick={() => this.props.add(this.state.name, this.state.lastName, this.state.email, this.state.phone)}>OK</button>
            </div>
        );
    }
}

export default AddNewContactLater;