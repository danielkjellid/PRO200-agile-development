import React, { Component } from 'react';
import RouteCard from '../RouteCard';
import routes from '../../fakeData/readyRoutes';

class ChooseDeparture extends Component {
    constructor(props){
        super(props);
        this.state={
            routes: routes,
            active: null,
        }
    }

    turnToActive = (id) => {
		this.setState({ active: id });
	};

    render() {
        let fortsettButton;
		this.state.active !== null
		? fortsettButton = <button onClick={this.props.continueToSeats} 
							className="fortsettButton fortsettButtonActive">
								Fortsett til betaling
							</button>
		: fortsettButton = <button className="fortsettButton fortsettButtonDisabled">
								Fortsett til betaling
							</button>
                            
        return (
            <div className={this.props.chooseDeparture ? 'displayBlock' : 'displayNone'}>
				<div>
					<div className={this.props.editNumberOfTravellers ? 'modalBack' : null}></div>
					<div className="numberOfTravellers">
						<div>
							{this.props.numberOfTravellers.map((item) => {
								if (item.number > 0) {
									return (
										<p key={item.type}>{item.type} : {item.number}</p>
					                );
								}
							})}
						</div>
						<button className="button" onClick={this.props.editTravellersHandler}>
							Rediger
						</button>
					</div>

					<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',width: '100%',}}>
						<div style={{display: 'flex',flexDirection: 'row',width: '100%',justifyContent: 'center',}}>
							<button className="button2">Tog</button>
							<button className="button3">Buss</button>
						</div>
                        {this.state.routes.map((item) => {
							return (
								<RouteCard
									active={this.state.active}
									click={() => this.turnToActive(item.id)}
									key={item.id}
									id={item.id}
									startStation={item.stationStart}
									endStation={item.stationEnd}
									travelTime={item.travelTime}
									startTime={item.startTime}
									endTime={item.endTime}
									track={item.track}
									numOfStops={item.numberOfStops}
									price={item.price}									
                                ></RouteCard>
							);
						})}

						{fortsettButton}
					</div>
			    </div>
			</div>
        );
    }
}

export default ChooseDeparture;