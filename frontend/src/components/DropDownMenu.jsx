import React, { Component } from 'react';
import DropDownItem from './DropDownItem';


class DropDownMenu extends Component {
    state = {  }
    
    render() {
        let inhold =this.props.stations.map(item => {
                        return(
                            <DropDownItem 
                                stationName={item.name} 
                                click={this.props.click}
                                drop={this.props.drop}
                                setStartPoint={this.props.setStartPoint}
                                setEndPoint={this.props.setEndPoint}
                                hideDropDownMenu={this.props.hideDropDownMenu}
                                isStartPoint={this.props.isStartPoint}
                                isEndPoint={this.props.isEndPoint}
                            />
                        )
                    })
   
        
        return (
            <div>
                {inhold}
            </div>
        );
    }
}

export default DropDownMenu;