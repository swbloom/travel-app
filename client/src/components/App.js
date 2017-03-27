import React from 'react';
import { authenticate, getToken, verifyToken } from '../services/authentication.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Authentication from '../containers/Authentication.js';
import DashboardContainer from '../containers/DashboardContainer.js'


class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Authentication />
					<Route path="/dashboard" component={DashboardContainer} />
				</div>
			</Router>
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

export default App;