import React, { Component } from 'react';
class ChoosePayment extends Component {

    render() {
        return(
            <div className={this.props.choosePayment ? 'displayBlock' : 'displayNone'}>
                <div>Betaling site</div>
                <div className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer" onClick={this.props.back}>
					<svg className="h-6 w-6 pr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/></svg>
					<p className="text-sm font-medium">Tilbake</p>
				</div>
                <button onClick={() => {this.props.continueToConfirmation(); this.props.submitNewOrder()}} className="fortsettButton fortsettButtonActive">
                    Bekreft og betal bestillingen
                </button>
            </div>
        )
    }
}

export default ChoosePayment;