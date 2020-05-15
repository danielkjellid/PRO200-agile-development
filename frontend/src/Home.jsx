import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
	state = {
		email: '',
		password: '',
	};

	onLoginEmail(val) {
		console.log(val);
	}

	render() {
		return (
			<div style={{ textAlign: 'center' }}>
				<br></br>
				<div>
					<Link to={'/login'} style={{ margin: '20px' }}>
						Login
					</Link>
					<Link to={'/signup'}>Sign Up</Link>
				</div>
				<div>
					<h1>Velkommen tilbake!</h1>
					<p>Har du ikke konto?</p>
					<Link to={'/login'}>Logg inn her</Link>
				</div>
				<div style={{ paddingTop: '150px' }}>
					<input placeholder="email..." onChange={this.onLoginEmail}></input>
					<br></br>
					<br></br>
					<input placeholder="password..."></input>
					<br></br>
					<br></br>
					<button>Logg inn</button>
				</div>
			</div>
		);
	}
}

export default Home;
