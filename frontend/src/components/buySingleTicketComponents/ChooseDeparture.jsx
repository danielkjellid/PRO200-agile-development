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
		let proceedButton;
		this.state.active !== null
		? proceedButton = 
							<button onClick={this.props.continueToSeats}
								className="p-3 w-full bg-vy-green-300 text-center text-sm font-medium text-white rounded-md hover:bg-vy-green-400">
								Fortsett til valg av sete
							</button>
		: proceedButton = 
							<button
								className="p-3 w-full bg-gray-500 text-center text-sm font-medium text-white rounded-md cursor-not-allowed">
								Fortsett til valg av sete
							</button>
														
		return (
			<div className={this.props.chooseDeparture ? 'block' : 'hidden'}>
				<div>
					<div className={this.props.editNumberOfTravellers ? 'modalBack' : null}></div>
					<div className="flex flex-row items-center mb-5 ml-5 mr-5 cursor-pointer" onClick={this.props.back}>
						<svg className="h-6 w-6 pr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"/></svg>
						<p className="text-sm font-medium">Tilbake</p>
					</div>
					<div className="numberOfTravellers mr-5 ml-5 pb-5 border-b border-grey-300 flex items-center justify-between">
						<div className="">
							<p className="text-sm font-medium text-gray-800">Reisende</p>
							{this.props.numberOfTravellers.map((item) => {
								if (item.number > 0) {
									return (<p className="text-sm text-gray-900" key={item.type}>{item.number}x {item.type}</p>);
								}
							})}
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
									/>
								);
							})}
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

export default ChooseDeparture;