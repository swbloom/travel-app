import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from '../actions'

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			return { 
				logged_in: action.logged_in 
			}
		case LOGOUT:
			return {
				logged_in: action.logged_in
			}
		default:
			return state
	}
}

