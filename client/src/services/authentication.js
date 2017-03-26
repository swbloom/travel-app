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
			} else {
			}
		}).catch((err) => {
			console.log('oops');
		});
	});
	
}

export function authenticate(name, password) {
		return new Promise((resolve, reject) => {
			axios.post(`${config.API_URL}/api/authenticate`, {
				name,
				password 
			}).then((res) => {
				if (res.data.token) {
					setLocalStorage({token: res.data.token});
					resolve({success: true});
				} else {
					reject({errorMsg: res.data.message});
				}
			});
		});

}

