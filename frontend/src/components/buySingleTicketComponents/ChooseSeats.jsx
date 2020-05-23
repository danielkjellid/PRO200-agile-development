import React, { Component } from 'react';
import Seats from '../Seats';
class ChooseSeats extends Component {
    render() {
        return (
            <div className={this.props.chooseSeat ? 'displayBlock' : 'displayNone'}>
				<div>Choose the seat site</div>
				<Seats />
                <button			
                    onClick={this.props.continueToPayment}
					className="fortsettButton fortsettButtonActive">
							Fortsett til betaling
				</button>
			</div>	
        );
    }
}

export default ChooseSeats;