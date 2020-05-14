import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            //I create fake user data for now
            user : {
                name: "Jonathan Swallow",    
            }
        }
    }
    render() {
        return (
            <div>
                <h1>Hei, {this.state.user.name}</h1>
                <button>Ny billett</button>

                <h3>Billetter</h3>
                <Link to={'/tickets'}>Se alle billetter</Link>

                <div>Miljøkalkulator</div>
            </div>
        );
    }
}

export default UserProfile;