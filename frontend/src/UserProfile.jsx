// e8007e4db60528762be401e35489e959
// Add this as a X-TripGo-Key header to your API calls to authenticate.

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ChooseTicketBS from './bottomsheets/ChooseTicketBS';
import BuySingleTicketBS from './bottomsheets/BuySingleTicketBS';
import Navbar from './components/navbar';

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
        const newTicketShow = this.state.chooseTicket;
        this.setState({chooseTicket: !newTicketShow});
    }

    buySingleTicketButtonHandler = () => {
        const buySingleTicketShow = this.state.singleTicket;
        this.setState({singleTicket: !buySingleTicketShow});
        this.newTicketButtonHandler();
    }

    renderChooseTicket = () => {
        if(this.state.chooseTicket) {
            return (
                <React.Fragment>
                    <ChooseTicketBS click={this.buySingleTicketButtonHandler} clickX={this.newTicketButtonHandler} ></ChooseTicketBS>
                </React.Fragment>
            )
        }
    }

    renderBuySingleTicket = () => {
        if(this.state.singleTicket === true){
            return (
                <React.Fragment>
                    <BuySingleTicketBS hideBuySingleTicket={this.hideBuySingleTicket}></BuySingleTicketBS>
                </React.Fragment>
            )
        } 
    }

    hideBuySingleTicket = () => {
        this.setState({singleTicket: false});
        this.newTicketButtonHandler();
    }


    render() {

        //temporary styling
        

        const profileImage = {
            width: "50px",
            height: "100%",
            backgroundColor: "yellow"
        }

        const welcome = {
            display: "flex",
            height: "60px",
            flexDirection: "row",
            marginBottom: "20px",
            alignItems: "center"
        }

        const section = {
            display: "flex",
            width: "90%",
            flexDirection: "column",
            alignItems: "center"
        }

        const header = {
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between"
        }

        const acticeTikcetContainer = {
            width: "80%",
            height: "200px",
            border: "solid 2px black",
            textAlign: "center"

        }
      


        return (

            <div>
                {this.renderChooseTicket()}
                {this.renderBuySingleTicket()}
                <Navbar></Navbar>
                <div style={container}>
                    <div style={welcome}>
                        <div style={profileImage}>Image</div>
                        <h2>Hei, {this.state.user.name}</h2>
                    </div>

                    <button style={styleNewTicketButton} onClick={this.newTicketButtonHandler}>Ny billett</button>

                    <div style={section}>
                        <div style={header}>
                            <h3>Billetter</h3>
                            <Link to={'/tickets'}>Se alle billetter</Link>
                        </div>

                        <div style={acticeTikcetContainer}>Aktiv billett section</div>
                    </div>
                    <div style={section}>
                        <div style={header}>
                            <h3>Miljøkalkulator</h3>
                        </div>
                        <div style={acticeTikcetContainer}>Miljø greier</div>
                    </div>

                
                    

                </div>
            </div>
        ); 
    }
}

export default UserProfile;