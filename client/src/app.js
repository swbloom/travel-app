require('./css/style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import Authentication from './containers/Authentication.js';
import { authenticate, getToken, verifyToken } from './services/authentication.js';
import { login } from './actions';
import store from './store'

const mapStateToProps = (state) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: () => {
			dispatch(login());
		}
	}
}



class App extends React.Component {
	render() {
		return (
			<div>
				<Authentication />
			</div>
		)
	}
	componentDidMount() {
		const token = getToken();
		verifyToken(token)
			.then((res) => {
				this.props.login();
			});
	}
}

const AppContainer = connect(
	mapStateToProps, 
	mapDispatchToProps
)(App);



ReactDOM.render(<Provider store={store}>
	<AppContainer />
</Provider>, document.getElementById('app'));