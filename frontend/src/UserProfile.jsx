import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ChooseTicketBS from './bottomsheets/ChooseTicketBS';
import BuySingleTicketBS from './bottomsheets/BuySingleTicketBS';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            //I create fake user data for now
            user : {
                name: "Jonathan Swallow",    
            },
            chooseTicket: false,
            singleTicket: false,
            periodTicket: false
        }
    }

    newTicketButtonHandler = () => {
        if(this.state.chooseTicket === false){
            this.setState({chooseTicket: true});
        } else {
            this.setState({chooseTicket: false});
        }
    }

    buySingleTicketButtonHandler = () => {
        if(this.state.singleTicket === false){
            this.setState({singleTicket: true});
        } else {
            this.setState({singleTicket: false});
        }
        this.setState({chooseTicket: false})
    }

    renderChooseTicket = () => {
        if(this.state.chooseTicket) {
            return (
                <React.Fragment>
                    <ChooseTicketBS click={this.buySingleTicketButtonHandler} ></ChooseTicketBS>
                </React.Fragment>
            )
        }
    }

    renderBuySingleTicket = () => {
        if(this.state.singleTicket === true){
            return (
                <React.Fragment>
                    <BuySingleTicketBS ></BuySingleTicketBS>
                </React.Fragment>
            )
        } 
    }


    render() {
        return (
            <div>
                <h1>Hei, {this.state.user.name}</h1>
                <button onClick={this.newTicketButtonHandler}>Ny billett</button>

                <h3>Billetter</h3>
                <Link to={'/tickets'}>Se alle billetter</Link>

                <div>Miljøkalkulator</div>

                {this.renderChooseTicket()}
                {this.renderBuySingleTicket()}

            </div>
        );
    }
}

export default UserProfile;