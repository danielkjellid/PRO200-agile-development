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
            ? "routeCard routeCardBackgroundGreen"
            : "routeCard"
        }
      >
        <div className="routeCardHeader">
          <h3>{this.props.startStation}</h3>
          <p>{this.props.travelTime}</p>
          <h3>{this.props.endStation}</h3>
        </div>
        <div className="routeCardHours">
          <h2>{this.props.startTime}</h2>
          <h2>{this.props.endTime}</h2>
        </div>
        <div className="track">
          <p>Spor {this.props.track}</p>
          <p>{this.props.numOfStops} stopp</p>
        </div>
        <div className="priceShow">
          <p>kr {this.props.price}</p>
        </div>
      </div>
    );
  }
}
export default RouteCard;
