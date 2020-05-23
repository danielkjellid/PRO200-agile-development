import React, { Component } from 'react';
class ChoosePayment extends Component {

    render() {
        return(
            <div className={this.props.choosePayment ? 'displayBlock' : 'displayNone'}>
                <div>Betaling site</div>
                <button onClick={() => {this.props.continueToConfirmation(); this.props.submitNewOrder()}} className="fortsettButton fortsettButtonActive">
                    Bekreft og betal bestillingen
                </button>
            </div>
        )
    }
}

export default ChoosePayment;