import React, { Component } from 'react';
//import numberOfTravellers from '../numberOfTravellers';
import EditTravellers from '../bottomsheets/EditTravellers';
import ticketTypes from '../ticketTypes';

class BuySingleTicketBS extends Component {
    constructor(props){
        super(props);
        this.state = {
            editNumberOfTravellers: false,
            numberOfTravellers: ticketTypes
        }
    }

    addNumber = (id) => {
        let number = this.state.numberOfTravellers[id].number;
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
                    <div>
                        {this.state.numberOfTravellers.map(item => {
                        return(
                            
                                <EditTravellers key={item.id} type={item.type} number={item.number} 
                                                add={() => this.addNumber(item.id)} 
                                                remove={() => this.removeNumber(item.id)}>
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

    render() {
        return (
            <div>
                <p onClick={this.props.hideBuySingleTicket}>Tilbake til billettvalg</p>
                <h3>Hvor mange skal reise?</h3>
                
                {this.state.numberOfTravellers.map(item => {
                    if(item.number > 0){
                        return <p key={item.type}>{item.type} : {item.number}</p>
                    }
                })}

                <button onClick={this.editTravellersHandler}>Rediger</button>
                {this.renderEditNumberOfTravellers()}

                <div>Avreise og destinasjon</div> {/* this section will be developed later */}
                <div>Når vil du reise?</div> {/* this section will be developed later */}
                <h3>Ønsker du å sitte?</h3>
                <button>Rediger</button>
            </div>
        );
    }
}

export default BuySingleTicketBS;