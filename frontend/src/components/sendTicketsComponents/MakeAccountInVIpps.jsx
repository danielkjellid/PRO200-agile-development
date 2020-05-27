import React, { Component } from 'react';
class MakeAccountInVIpps extends Component { 
    render() {
        let inhold;
        if(this.props.makeAccountInVIpps) {
            inhold =
            (<div>Oppgjør i vipps</div>)
        }


        return (
            <div>
                {inhold}
            </div>
            
        );
    }
}

export default MakeAccountInVIpps;