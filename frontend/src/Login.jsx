import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div>Login</div>
                <Link to={'/userprofile'}>User Profile</Link>
            </div>
        );
    }
}

export default Login;