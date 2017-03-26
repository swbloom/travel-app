import axios from 'axios';
import config from '../../config.js';
import { store } from 'redux';

const setLocalStorage = (options) => {
	Object.keys(options).map(key => {
		localStorage.setItem(key, options[key]);
	});
}

export function getToken() {
	return localStorage.getItem('token');
}

export function verifyToken(token) {
	return axios.get(`${config.API_URL}/api/`, {
		params: {
			token
		}
	});
}

export function authenticate(name, password) {
		return axios.post(`${config.API_URL}/api/users/authenticate`, {
			name,
			password 
		})
}

export function login(token) {
	if (token) {
		setLocalStorage({token});
	} 
}
