import React from 'react';
import { authenticate, login } from '../services/authentication.js';

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
			.then((res) => {
				if (res.data.token) {
					login(res.data.token)
					this.props.login(true);
				} else {
					this.setState({errorMsg: res.data.message})
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" onChange={this.handleChange} name="username" />
				<input type="text" onChange={this.handleChange} name="password" />
				<button>Login</button>
			</form>
		)
	}
}

export default Login;