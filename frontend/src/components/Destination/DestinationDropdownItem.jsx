// framework imports
import React from 'react';


// dropdown items that displays in a dropdown list to preview selected locations for easy access
function DestinationDropdownItem(props) {
  
    let dropdownItem;
    
    // render dropdownItem excluding selected stations
    if (props.isStartPoint && props.endPoint !== props.stationName && props.startPoint !== props.stationName){
        dropdownItem = (
            <div 
                onClick={() => {
                    props.setStartPoint(props.stationName); 
                    props.hideDropDownMenu()
                }}
                className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700"
                tabIndex="0"
                aria-label={'Departure from ' + props.stationName}
                onKeyDown={ e => {
                    if (e.key === 'Enter') {
                        props.setStartPoint(props.stationName); 
                        props.hideDropDownMenu()
                    }
                }}
            >
                <p>{props.stationName}</p>
            </div>
        ) 
    }
    if (props.isEndPoint && props.startPoint !== props.stationName && props.endPoint !== props.stationName){
        dropdownItem = (
            <div 
                onClick={() => {
                    props.setEndPoint(props.stationName); 
                    props.hideDropDownMenu()
                }}
                className="px-3 py-2 mb-2 w-full border rounded border-gray-400 text-sm text-gray-700"
                tabIndex="0"
                aria-label={'Arrive at ' + props.stationName}
                onKeyDown={ e => {
                    if (e.key === 'Enter') {
                        props.setEndPoint(props.stationName); 
                        props.hideDropDownMenu()
                    }
                }}

            >
                <p>{props.stationName}</p>
            </div>
        )
    }

    return (
        <div>{dropdownItem}</div>
    );
}

export default DestinationDropdownItem;