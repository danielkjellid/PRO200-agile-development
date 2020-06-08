import React from 'react';

function DropDownItem(props) {
  
    let inhold;
    
    if(props.isStartPoint && props.endPoint !== props.stationName && props.startPoint !== props.stationName){
        inhold = <div onClick={() => {props.setStartPoint(props.stationName); props.hideDropDownMenu()} }className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700">
                   <p>{props.stationName}</p>
                </div> 
    }
    
    if(props.isEndPoint && props.startPoint !== props.stationName && props.endPoint !== props.stationName){
        inhold = <div onClick={() => {props.setEndPoint(props.stationName); props.hideDropDownMenu()} }className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700">
                    <p>{props.stationName}</p>
                </div> 
        }

    return (
            <div>{inhold}</div>
    );
}

export default DropDownItem;