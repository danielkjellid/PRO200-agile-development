import React, { Component } from 'react';
class EditTravellers extends Component {
  render() {
    return (
      <div className="flex items-center justify-between pt-6">
        <p className="text-gray-900 font-medium text-base">{this.props.type}</p>
        <div className="flex items-center">
          <button 
            onClick={this.props.remove}
            className="bg-vy-green-200 rounded-full p-1"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-vy-green-300" fill="CurrentColor">
              <path d="M17 11a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2h10z"/>
            </svg>
          </button> 
          <div className="w-3 mx-2 text-center flex justify-center">
            <p className="text-gray-900 font-semibold">{this.props.number}</p>
          </div>
          <button 
            onClick={this.props.add}
            className="bg-vy-green-200 rounded-full p-1"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-vy-green-300" fill="CurrentColor">
              <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
            </svg>
          </button> 
        </div>
      </div>
    );
  }
}

export default EditTravellers;