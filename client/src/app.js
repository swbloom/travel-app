require('./css/style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import Authentication from './containers/Authentication.js';
import { authenticate, login, getToken, verifyToken } from './services/authentication.js';

let store = createStore(
	rootReducer, 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
				console.log(res.data);
			});
	}
}

ReactDOM.render(<Provider store={store}>
	<App />
</Provider>, document.getElementById('app'));