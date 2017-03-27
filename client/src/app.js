require('./css/style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import Authentication from './containers/Authentication.js';
import { authenticate, getToken, verifyToken } from './services/authentication.js';
import { login } from './actions';
import store from './store'
import AppContainer from './containers/AppContainer.js';

ReactDOM.render(<Provider store={store}>
	<AppContainer />
</Provider>, document.getElementById('app'));