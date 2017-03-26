import { connect } from 'react-redux';
import { login, logout } from '../actions';
import Login from '../components/Login.js';

const mapStateToProps = (state) => {
	return {
		logged_in: state.logged_in
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: () => {
			dispatch(login());
		},
		logout: () => {
			dispatch(logout());
		}
	}
}

const Authentication = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Login);

export default Authentication;