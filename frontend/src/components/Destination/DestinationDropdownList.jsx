// framework imports
import React from 'react';

// component imports
import DestinationDropdownItem from './DestinationDropdownItem';


// dropdown list that previews stations for easy access to the user
function DestinationDropdownList(props) {
    
    let dropdownItems = props.stations.map((item, index) => {
        return(
            <DestinationDropdownItem 
                key={index}
                stationName={item.name} 
                click={props.click}
                drop={props.drop}
                setStartPoint={props.setStartPoint}
                setEndPoint={props.setEndPoint}
                hideDropDownMenu={props.hideDropDownMenu}
                isStartPoint={props.isStartPoint}
                isEndPoint={props.isEndPoint}
                startPoint={props.startPoint}
                endPoint={props.endPoint}
            />
        )
    })
   
    return (
        <div aria-label="stations">
            {dropdownItems}
        </div>
    );
}


export default DestinationDropdownList;