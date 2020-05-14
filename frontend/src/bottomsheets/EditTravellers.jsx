import React, { Component } from 'react';
class EditTravellers extends Component {
    
  
    render() {
        return (
            <div>
                <p>{this.props.type}</p> <button onClick={this.props.remove}>-</button> <p>{this.props.number}</p><button onClick={this.props.add}>+</button>
            </div>
        );
    }
}

export default EditTravellers;