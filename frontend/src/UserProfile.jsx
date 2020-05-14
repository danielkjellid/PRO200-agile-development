import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ChooseTicketBS from './bottomsheets/ChooseTicketBS';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            //I create fake user data for now
            user : {
                name: "Jonathan Swallow",    
            },
            chooseTicket: false
        }
    }

    newTicketHandler = () => {
        if(this.state.chooseTicket === false){
            this.setState({chooseTicket: true});
        } else {
            this.setState({chooseTicket: false});
        }
    }

    renderChooseTicket = () => {
        if(this.state.chooseTicket) {
            return (
                <React.Fragment>
                    <ChooseTicketBS></ChooseTicketBS>
                </React.Fragment>
            )
        }
    }


    render() {
        return (
            <div>
                <h1>Hei, {this.state.user.name}</h1>
                <button onClick={this.newTicketHandler}>Ny billett</button>

                <h3>Billetter</h3>
                <Link to={'/tickets'}>Se alle billetter</Link>

                <div>Miljøkalkulator</div>

                {this.renderChooseTicket()}
            </div>
        );
    }
}

export default UserProfile;