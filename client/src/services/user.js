import axios from 'axios';
import config from '../../config.js';
import store from '../store';
import { login } from '../actions';
import { setLocalStorage } from './authentication';

export function createUser(name, password) {
	console.log(name, password);
	return new Promise((resolve, reject) => {
		axios.post(`${config.API_URL}/api/users/create`, {
			name,
			password 
		}).then((res) => {
			if (res.data.token) {
				setLocalStorage({token: res.data.token});
				store.dispatch(login());
				resolve({success: true});
			} else {
				reject({errorMsg: res.data.message});
			}
		});
	});

}