import React from 'react';
import DestinationDropdownItem from './DestinationDropdownItem';


function DestinationDropdownList(props) {
    
    let inhold =props.stations.map(item => {
        return(
            <DestinationDropdownItem 
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
        <div>
            {inhold}
        </div>
    );
}


export default DestinationDropdownList;