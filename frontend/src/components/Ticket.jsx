import React, { Component } from 'react';

class Ticket extends Component {

	constructor(props) {
		super(props)
	}

	render() {
			return (
				<div>
					<div className="bg-white shadow rounded-md">
						<div className="px-2 py-2">
							<div className="flex items-center">
								<div className={this.props.active ? "bg-green-400 rounded-full h-24 w-2" : "bg-red-400 rounded-full h-24 w-2"}>
									{/* Empty div to create left border */}
								</div>
								<div className="ml-4 w-full pr-2">
									<div className="flex justify-between items-center">
										<p className="font-medium text-base text-gray-900">Tur til Danmark</p>
										<p className="font-medium text-sm text-gray-900">kr 420,00</p>
									</div>
									<div className="mt-2 flex justify-between items-center">
										<p className="text-gray-700 text-sm">Fra <span className="font-medium text-sm text-gray-900">Oslo S</span> til <span className="font-medium text-sm text-gray-900">Gjøvik</span></p>
										<div className="flex">
											{/* Colors to be replaces with images  */}
											<div className="h-8 w-8 border-2 border-white bg-red-200 rounded-full"></div>
											<div className="h-8 w-8 border-2 border-white bg-red-300 rounded-full -ml-2"></div>
											<div className="h-8 w-8 border-2 border-white bg-red-400 rounded-full -ml-2"></div>
											<div className="h-8 w-8 border-2 border-white bg-red-500 rounded-full -ml-2"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
}

export default Ticket;
