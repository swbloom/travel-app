import { connect } from 'react-redux';
import { login, logout } from '../actions';
import Login from '../components/Login.js';

const mapStateToProps = (state) => {
	return {
		logged_in: state.logged_in
	};
}


const Authentication = connect(
	mapStateToProps,
)(Login);

export default Authentication;