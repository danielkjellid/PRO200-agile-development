import React, { Component } from 'react';
class BuySingleTicketBS extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <p>Tilbake til billettvalg</p>
                <h3>Hvor mange skal reise?</h3>
                <button>Rediger</button>

                <div>Avreise og destinasjon</div> {/* this section will be developed later */}
                <div>Når vil du reise?</div> {/* this section will be developed later */}
                <h3>Ønsker du å sitte?</h3>
                <button>Rediger</button>
            </div>
        );
    }
}

export default BuySingleTicketBS;