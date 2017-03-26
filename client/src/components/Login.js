import React from 'react';
import { authenticate, logoutUser } from '../services/authentication.js';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			errorMsg: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		authenticate(this.state.username, this.state.password)
			.catch((err) => this.setState({errorMessage}));
	}
	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={this.handleChange} name="username" />
					<input type="text" onChange={this.handleChange} name="password" />
					<button>Login</button>
					<p>The user is currently {this.props.logged_in ? "logged in" : "logged out"}</p>
				</form>
				<button onClick={logoutUser}>Logout</button>
			</div>

		)
	}
}

export default Login;