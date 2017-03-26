export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function logout() {
	return {
		type: LOGOUT,
		logged_in: false
	}
}

export function login() {
	return {
		type: LOGIN,
		logged_in: true
	}
}