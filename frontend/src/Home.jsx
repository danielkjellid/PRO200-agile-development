import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div>Home Page</div>
                <Link to={"/login"}>Login</Link>
                <Link to={"/signup"}>Sign Up</Link>
            </div>
        );
    }
}

export default Home;