import React from 'react';
import DestinationDropdownItem from './DestinationDropdownItem';


function DestinationDropdownList(props) {
    
    let inhold =props.stations.map((item, index) => {
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
        <div>
            {inhold}
        </div>
    );
}


export default DestinationDropdownList;