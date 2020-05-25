import React, { Component } from 'react';
class numberOfTravellers extends Component {
    state = {  }
    render() {
        return (
        <div><p>{this.props.number}x {this.props.type}</p></div>
        );
    }
}

export default numberOfTravellers;