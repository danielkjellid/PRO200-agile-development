import React, { Component } from 'react';
class numberOfTravellers extends Component {
    state = {  }
    render() {
        return (
        <div><p>{this.props.type} : {this.props.number}</p></div>
        );
    }
}

export default numberOfTravellers;