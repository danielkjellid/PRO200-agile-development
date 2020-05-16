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

    render() {
        const modalContainer = {
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            bottom: "0%",
            position: "fixed",
            zIndex: 2,
            backgroundColor: "white"
        }

        const modalBack = {
            width: "100%",
            height: "100vh",
            zIndex: 1,
            position: "fixed",
            backgroundColor: "black",
            opacity: "0.5"
        }

        const input = {
            borderBox: "box-sizing",
            padding: "10px 20px",
            border: "1px solid black",
            width: "90%",
            marginBottom: "5px"
        }

        const fortsettButton = {
            padding: "10px 50px",
            width: "90%",
            backgroundColor: "#00685E",
            color: "white",
            border: "none",
        }

        return (
            <div>
                <div style={modalBack}></div>
                <div style={modalContainer}>
                    <div style={{display: "flex", flexDirection: "row",justifyContent: "space-between" }}>
                        <p>Kjøp enkeltbillett</p>
                        <button>X</button>
                    </div>

                    <div>
                        <p onClick={this.props.hideBuySingleTicket}>Tilbake til billettvalg</p>
                        <div style={{display: "flex", flexDirection: "column", width: "90%"}}>
                            <p>Avreise og destinasjon</p>
                            <input style={input} placeholder="Avreise"/>
                            <input style={input} placeholder="Destinasjon"/>
                        </div>
                    </div>
                    
                    
                    
                    <div>Når vil du reise?</div> {/* this section will be developed later */}
                    <button style={fortsettButton}>Fortsett til avganger og billetter</button>
                    
                    
                    <div>
                        {/* {this.state.numberOfTravellers.map(item => {
                            if(item.number > 0){
                                return <p key={item.type}>{item.type} : {item.number}</p>
                            }
                        })}

                        <button onClick={this.editTravellersHandler}>Rediger</button>
                        {this.renderEditNumberOfTravellers()} */}
                    </div>


                </div>
            </div>
        );
    }
}

export default BuySingleTicketBS;