import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App.js';

const mapDispatchToProps = (dispatch) => {
	return {
		login: () => {
			dispatch(login());
		}
	}
}

const AppContainer = connect(
	undefined, 
	mapDispatchToProps
)(App);

export default AppContainer;