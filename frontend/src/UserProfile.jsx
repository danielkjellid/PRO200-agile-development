import React, { Component } from 'react';
class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            //I create fake user data for now
            user = {
                name: "Jonathan Swallow",
                
            }
        }
    }
    render() {
        return (
            <div>profile</div>
        );
    }
}

export default UserProfile;