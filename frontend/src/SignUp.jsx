import React, { Component } from 'react';
class SignUp extends Component {
    state = {  }
    render() {
        return (
            <div>
                <div>Sign Up page</div>
                <Link to={'/userprofile'}>User Profile</Link>
            </div>
        );
    }
}

export default SignUp;