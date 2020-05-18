import React, { Component } from 'react';
//import numberOfTravellers from '../numberOfTravellers';
import EditTravellers from '../bottomsheets/EditTravellers';
import ticketTypes from '../ticketTypes';

class BuySingleTicketBS extends Component {
    constructor(props){
        super(props);
        this.state = {
            editNumberOfTravellers: false,
            numberOfTravellers: ticketTypes,
            chooseDestination: true,
            chooseDeparture: false,
            chooseSeat: false,
            choosePayment: false,
            confirmation: false
        }
    }

    addNumber = (id) => {
        this.setState({number : this.state.numberOfTravellers[id].number++});
    }

    removeNumber = (id) => {
        let number = this.state.numberOfTravellers[id].number;
        if(number>0){
            this.setState({number : this.state.numberOfTravellers[id].number--});
        }
    }

    editTravellersHandler = () => {
        this.setState({editNumberOfTravellers: true})
    }

    renderEditNumberOfTravellers = () => {
        if(this.state.editNumberOfTravellers === true){
                return(
                    <div className="editNumberOfTravellersContainer">
                        {this.state.numberOfTravellers.map((item,index) => {
                        return(
                            
                                <EditTravellers key={index} type={item.type} number={item.number} 
                                                add={() => this.addNumber(index)} 
                                                remove={() => this.removeNumber(index)}>
                                </EditTravellers>
                        )
                    })}
                        <button onClick={this.hideEditNumberOfTravellers}>Fortsett</button>
                    </div>
                )}
    }

    hideEditNumberOfTravellers = () => {
        this.setState({editNumberOfTravellers: false});
    }

    continueToDepartures = () => {
        this.setState({chooseDestination: false, chooseDeparture: true, })
    }

    continueToSeats = () => {
        this.setState({chooseDeparture: false, chooseSeat: true })
    }

    continueToPayment = () => {
        this.setState({chooseSeat: false, confirmation: true })
    }

    continueToConfirmation = () => {
        this.setState({chooseSeat: false, choosePayment: true })
    }
    

    render() {
       
        return (
            <div>
                <div onClick={this.props.cancelTransaction} className="modalBack"></div>
                <div className="modalContainer">
                    <div style={{display: "flex", flexDirection: "row",justifyContent: "space-between" }}>
                        <p>Kjøp enkeltbillett</p>
                        <button onClick={this.props.cancelTransaction}>X</button>
                    </div>

                    
                    <div className={ this.state.chooseDestination ?  "displayBlock" : "displayNone" }>
                        <div>
                            <p onClick={this.props.hideBuySingleTicket}>Tilbake til billettvalg</p>
                            <div style={{display: "flex", flexDirection: "column", width: "90%"}}>
                                <p>Avreise og destinasjon</p>
                                <input className="input" placeholder="Avreise"/>
                                <input className="input"placeholder="Destinasjon"/>
                            </div>
                        </div>
                        
                        
                        
                        <div>Når vil du reise?</div> {/* this section will be developed later */}
                        <button onClick={this.continueToDepartures} className="fortsettButton">Fortsett til avganger og billetter</button>
                    </div> 
                    
                    
                    <div className={ this.state.chooseDeparture ?  "displayBlock" : "displayNone" }>
                        <div className="modalContainer">
                            <div className= "numberOfTravellers"> 
                                <div>
                                    {this.state.numberOfTravellers.map(item => {
                                        if(item.number > 0){
                                            return <p key={item.type}>{item.type} : {item.number}</p>
                                        }
                                    })}
                                </div>
                                <button className="button" onClick={this.editTravellersHandler}>Rediger</button>
                                
                            </div>

                            <div>
                                <button className="button2">Tog</button>
                                <button className="button3">Buss</button>
                                <div className="routeCard">
                                    <div className="routeCardHeader">
                                        <p>Oslo S</p>
                                        <p>2t 0min</p>
                                        <p>Gjøvik</p>
                                    </div>
                                    <div className="routeCardHours">
                                        <p>21:44</p>
                                        <div>image</div>
                                        <p>23:34</p>
                                    </div>
                                </div>
                                <div className="routeCard">
                                    <div className="routeCardHeader">
                                        <p>Oslo S</p>
                                        <p>2t 0min</p>
                                        <p>Gjøvik</p>
                                    </div>
                                    <div className="routeCardHours">
                                        <p>21:44</p>
                                        <div>image</div>
                                        <p>23:34</p>
                                    </div>
                                </div>
                                <button onClick={this.continueToSeats} className="fortsettButton">Fortsett til valg av sete</button>
                            </div>
                        </div>
                    </div>
                                {this.renderEditNumberOfTravellers()}
                    <div className={ this.state.chooseSeat ?  "displayBlock" : "displayNone" }>
                        <div>Choose the seat site</div>
                        <button onClick={this.continueToPayment} className="fortsettButton">Fortsett til betaling</button>
                    </div>

                    <div className={ this.state.choosePayment ?  "displayBlock" : "displayNone" }>
                        <div>Betaling site</div>
                        <button onClick={this.continueToConfirmation} className="fortsettButton">Fortsett til betaling</button>  
                    </div>

                    <div className={ this.state.confirmation ?  "displayBlock" : "displayNone" }>
                        <div>Betaling site</div>
                        <button className="fortsettButton">Send billetter til venner</button>  
                        <button  className="fortsettButton">Se billettene</button>  
                    </div>
                </div>
            </div>
        );
    }
}

export default BuySingleTicketBS;