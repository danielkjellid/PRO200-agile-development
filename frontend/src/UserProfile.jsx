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
<<<<<<< HEAD
                <h1>Hei, {this.state.user.name}</h1>
=======
                <h1>Hei {this.state.user.name}</h1>
>>>>>>> 1ca509336131bd6f5ebffdc570a662a273959b74
                <button>Ny billett</button>

                <h3>Billetter</h3>
                <Link to={'/tickets'}>Se alle billetter</Link>
<<<<<<< HEAD

                <div>Miljøkalkulator</div>
=======
>>>>>>> 1ca509336131bd6f5ebffdc570a662a273959b74
            </div>
        );
    }
}

export default UserProfile;