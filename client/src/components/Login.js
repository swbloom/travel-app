import React from 'react';
import { authenticate, logoutUser } from '../services/authentication.js';
import { createUser } from '../services/user.js';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			loginUsername: '',
			loginPassword: '',
			createUsername: '',
			createPassword: '',
			errorMsg: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.createUser = this.createUser.bind(this);
		this.login = this.login.bind(this);
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	createUser(e) {
		e.preventDefault();
		createUser(this.state.createUsername, this.state.createPassword)
			.catch((err) => this.setState({errorMessage: err.errorMessage}));	
		
	}
	login(e) {
		e.preventDefault();
		authenticate(this.state.loginUsername, this.state.loginPassword)
			.catch((err) => this.setState({errorMessage: err.errorMessage}));
	}
	render() {
		return (
			<div>
				{this.props.logged_in ? 
					<button onClick={logoutUser}>Logout</button>
				:
					<div>
						<form onSubmit={this.login}>
							<input type="text" onChange={this.handleChange} name="loginUsername" />
							<input type="text" onChange={this.handleChange} name="loginPassword" />
							<button>Login</button>
						</form>
						<form onSubmit={this.createUser}>
							<input type="text" onChange={this.handleChange} name="createUsername" />
							<input type="text" onChange={this.handleChange} name="createPassword" />
							<button>Create User</button>
						</form>
					</div>
				}
				<p>The user is currently {this.props.logged_in ? "logged in" : "logged out"}</p>
			</div>

		)
	}
}

export default Login;