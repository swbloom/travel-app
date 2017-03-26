import { connect } from 'react-redux';
import { login } from '../actions';
import Login from '../components/Login.js';

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

const Authentication = connect(
	mapStateToProps, 
	mapDispatchToProps
)(Login);

export default Authentication;