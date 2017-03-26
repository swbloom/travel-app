import { combineReducers } from 'redux'
import { LOGIN } from '../actions'

export default function rootReducer(state = {}, action) {
	switch (action.type) {
		case LOGIN:
			const { name, password } = action; 
			return { 
				name, 
				password 
			}
		default:
			return state
	}
}

