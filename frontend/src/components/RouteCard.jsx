import React, { Component } from "react";
//testing comment
class RouteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        onClick={this.props.click} 
        className={
          this.props.active === this.props.id 
            ? "bg-vy-green-100 border border-vy-green-300 rounded-md p-4 mb-5 cursor-pointer"
            : "bg-white border border border-gray-300 rounded-md p-4 mb-5 cursor-pointer hover:bg-vy-green-100 hover:border-vy-green-300"
          }
        >
        <div className="flex items-center justify-between border-b border-gray-300 pb-4">
          <div>
            <p className="text-gray-800 text-base font-medium">{this.props.startStation}</p>
            <p className="mt-2 text-gray-800 text-xl font-bold">{this.props.startTime}</p>
            <p className="mt-2 text-gray-700 text-sm">Spor {this.props.track}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-700 text-sm">{this.props.travelTime}</p>
            <span className="mt-5 block px-2 py-2 border border-vy-green-300 rounded-md text-vy-green-300">R30x</span>
          </div>
          <div>
            <p className="text-gray-800 text-base font-medium">{this.props.endStation}</p>
            <p className="mt-2 text-gray-800 text-xl font-bold">{this.props.endTime}</p>
            <p className="mt-2 text-gray-700 text-sm">{this.props.numOfStops} stopp</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center">
            <span className="rounded-full bg-vy-green-300 h-2 w-2"></span>
            <p className="ml-2 text-gray-700 text-sm">I rute ved Asker kl. 21:19</p>
          </div>
          <p className="text-green-700 text-sm text-vy-green-300 font-medium">kr {this.props.price}</p>
        </div>
      </div>
    );
  }
}
export default RouteCard;
