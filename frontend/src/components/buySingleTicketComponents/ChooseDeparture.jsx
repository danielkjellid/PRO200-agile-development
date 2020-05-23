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
					<div className="numberOfTravellers mr-5 ml-5 pb-5 border-b border-grey-300">
						<div className="">
							<h4 className="text-sm font-medium text-gray-800">Reisende</h4>
							{this.props.numberOfTravellers.map((item) => {
								if (item.number > 0) {
									return (
										<p className="text-sm" key={item.type}>{item.type} : {item.number}</p>
					                );
								}
							})}
						</div>
						<button className="px-4 rounded-md button" onClick={this.props.editTravellersHandler}>
							<p className="vy-green text-sm m-0 font-medium">Rediger</p>
						</button>
					</div>

					<div className="px-5 w-full m-0"/* {{display: 'flex', flexDirection: 'column', alignItems: 'center',width: '100%',}} */>
						<div className="rounded-md mb-5 p-1 flex flex-row w-auto bg-gray-300" /* style={{display: 'flex',flexDirection: 'row',width: '100%',justifyContent: 'center',}} */>
							<button className="w-full bg-white mr-1 p-2 rounded text-sm font-medium text-gray-700">Tog</button>
							<button className="w-full bg-transparent ml-1 p-2 rounded text-sm font-medium text-gray-700">Buss</button>
						</div>
                        {this.state.routes.map((item) => {
							return (
								<RouteCard
									active={this.state.active}
									click={() => this.turnToActive(item.id)}
									key={item.id}
									id={item.id}
									startStation={this.props.startPoint}
									endStation={this.props.endPoint}
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