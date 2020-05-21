import React, { Component } from "react";
class Tickets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      orders: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://localhost:5001/orders", {method: "get"});
      
      const payload = await response.json();
      console.log(payload);
      this.setState({
        orders: payload,
        isLoaded: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    if (this.state.isLoaded) {
      return <div>Is Loading</div>;
    } else {
      return (this.state.orders.map((item) => {
        return (<p>{item.name}</p>)
      }))
    }
  }
}

export default Tickets;
