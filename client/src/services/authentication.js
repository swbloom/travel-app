import axios from 'axios';
import config from '../../config.js';
import store from '../store';
import { login, logout } from '../actions'

export function setLocalStorage (options) {
	Object.keys(options).map(key => {
		localStorage.setItem(key, options[key]);
	});
}

export function getToken() {
	return localStorage.getItem('token');
}

export function removeToken() {
	localStorage.removeItem('token');
}

export function verifyToken(token) {
	return new Promise((resolve, reject) => {
		axios.get(`${config.API_URL}/api/`, {
			params: {
				token
			}
		}).then((res) => {
			if (res.status === 200) {
				resolve(res);
			}				
		}).catch((err) => {
			console.log(err);
		});
	});
}

export function logoutUser() {
	localStorage.removeItem('token');
	store.dispatch(logout());
}

export function authenticate(name, password) {
		return new Promise((resolve, reject) => {
			axios.post(`${config.API_URL}/api/authenticate`, {
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

