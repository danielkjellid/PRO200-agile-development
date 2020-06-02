import React, { Component } from 'react';


class DropDownItem extends Component {
    state = {  }

    

    render() {

        let inhold;
        if(this.props.isStartPoint){
            inhold = <div onClick={() => {this.props.setStartPoint(this.props.stationName); this.props.hideDropDownMenu()} }className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700">
                        <p>{this.props.stationName}</p>
                    </div> 
        }
        if(this.props.isEndPoint){
            inhold = <div onClick={() => {this.props.setEndPoint(this.props.stationName); this.props.hideDropDownMenu()} }className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700">
                        <p>{this.props.stationName}</p>
                    </div> 
        }

        return (
                <div>{inhold}</div>
        );
    }
}

export default DropDownItem;