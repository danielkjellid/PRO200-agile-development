// framework imports
import React, { Component } from 'react';

// component imports
import DepartureRouteCard from './DepartureRouteCard';

// data imports
import routes from '../../data/routes';


// component that displays the available routes based on previous selection, as well as travellers adjustment
class Departure extends Component {

	constructor(props){
        super(props);
        this.state = {
            routes: routes,
            active: null,
        }
	}

	// method for selecting clicked route card
	setRouteCardActive = (id) => {
		this.setState({active: id});
	};

	render() {
		let proceedButton;
        this.state.active !== null
        
        // conditionally render proceed button based on state
		? proceedButton = (
            <button onClick={this.props.continueToSeats}
                className="p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400">
                Fortsett til valg av sete
            </button>
        )
		: proceedButton = (
            <button
                className="p-3 w-full bg-gray-500 text-center text-sm font-medium text-white rounded-md cursor-not-allowed">
                Fortsett til valg av sete
            </button>
        )
														
		return (
			<div className={this.props.chooseDeparture ? 'block' : 'hidden'}>
				<div>
					<div className={this.props.editNumberOfTravellers ? 'w-full h-full z-10 block absolute bottom-0 bg-black opacity-25' : null}></div>
					<div className="numberOfTravellers mr-5 ml-5 pb-5 border-b border-grey-300 flex items-center justify-between">
						<div className="">
							<p className="text-sm font-medium text-gray-800 pb-1">Reisende</p>
						
							{this.props.numberOfTravellers.map((item) => (
								item.number > 0 && <p className="text-sm text-gray-900" key={item.type}> <b>{item.number} {item.type}</b></p>
							))}
						</div>
						<button onClick={this.props.editTravellersHandler}
							className="p-3 bg-vy-green-200 text-center text-sm font-medium text-vy-green-300 rounded-md hover:bg-vy-green-100">
							Rediger
						</button>
					</div>

					<div className="px-5">
						<div className="rounded-md mb-5 p-1 flex flex-row w-auto bg-gray-300">
							<button className="w-full bg-white mr-1 p-2 rounded text-sm font-medium text-gray-700">Tog</button>
							<button className="w-full bg-transparent ml-1 p-2 rounded text-sm font-medium text-gray-700">Buss</button>
						</div>
						<div>
                            {
                                this.state.routes.map((item) => {
                                    return (
                                        <DepartureRouteCard
                                            active={this.state.active}
                                            click={() => this.setRouteCardActive(item.id)}
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
                                        />
                                    );
                                })
														}
						</div>
					</div>
					<div className="px-5 pt-5 pb-6 bg-gray-100 modal-footer">
						{proceedButton}
					</div>
				</div>
			</div>
		);
	}
}

export default Departure;