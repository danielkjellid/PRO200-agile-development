import React from 'react';
import DropDownItem from './DropDownItem';


function DropDownMenu(props) {
    
    let inhold =props.stations.map(item => {
        return(
            <DropDownItem 
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


export default DropDownMenu;