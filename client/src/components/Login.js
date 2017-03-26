import React from 'react';
import { authenticate, logout, removeToken } from '../services/authentication.js';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			errorMsg: ''
		}
		this.logout = this.logout.bind(this);
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
			.then((res) => {
				if (res.success) {
					this.props.login();
				}
			})
			.catch((err) => this.setState({errorMessage}));
	}
	logout() {
		removeToken();
		this.props.logout();
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
				<button onClick={this.logout}>Logout</button>
			</div>

		)
	}
}

export default Login;