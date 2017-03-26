export const LOGIN = 'LOGIN'


export function login() {
	return {
		type: LOGIN,
		logged_in: true
	}
}