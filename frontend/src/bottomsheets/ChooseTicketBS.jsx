import React, { Component } from 'react';

class ChooseTicketBS extends Component {
    render() {

        const modalContainer = {
            width: "100%",
            height: "40vh",
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

        const button = {
            boxSizing: "border-box",
            padding: "40px 40px",
            border: "solid 1px #E2E8F0",
            backgroundColor: "white"
        }

        return (
            <div>
                <div onClick={this.props.clickX} style={modalBack}></div>
                <div style={modalContainer}>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <h4>Velg billett</h4>
                        <button onClick={this.props.clickX}>x</button>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <button style={button} id="single" onClick={this.props.click}>Enkeltbillett</button>
                        <button  style={button} id="period">Periodebillett</button>
                    </div>
                    <p>Ekstra soner</p>
                    <p>Kjøp til andre</p>
                </div>
            </div>
        );
    }
}

export default ChooseTicketBS;