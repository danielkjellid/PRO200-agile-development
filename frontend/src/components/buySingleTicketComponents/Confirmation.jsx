import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Confirmation extends Component {
    render() {
        return (
            <div className={this.props.confirmation ? 'displayBlock' : 'displayNone'}>
				<div>Send videre</div>
				<button onClick={this.props.renderSendTicket} className="fortsettButton fortsettButtonActive">
					Send billetter til venner
				</button>
				
                <Link to={'/tickets'} onClick={this.props.endTransaction}>
                    <button className="fortsettButton fortsettButtonActive">
                        Se billettene
                    </button>
                </Link>
                    
				
			</div>
        );
    }
}

export default Confirmation;