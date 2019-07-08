import * as actionsTypes from '../actions/actionsTypes'
import { updateObject } from '../utility';

const initialState = {
	token: null,
	error: null,
	loading: false
}

const authStart = (state, action) => {
	return updateObject(state, {
		error:null, 
		loading: true,
	})
}

const authSuccess = (state, action) => {
	return updateObject(state, {
		error:null, 
		token: action.token,
		loading:false
	})
}

const authFail = (state, action) => {
	return updateObject(state, {
		error:action.error, 
		loading: false,
	})
}

const authLogout = (state, action) => {
	return updateObject(state, {
		token: null
	})
}

const removeStart = (state, action) => {
	return updateObject(state, {
		loading:true
	})
}

const removeSuccess = (state, action) => {
	return updateObject(state, {
		loading:false
	})
}

const startQuantity = (state, action) => {
	return updateObject(state, {
		loading:true
	})
}

const succcessQuantity = (state, action) => {
	return updateObject(state, {
		loading:false
	})

}

const reducer = (state=initialState, action) => {
	switch (action.type) {
		case actionsTypes.CHANGED_QUANTITY_SUCCESS : return succcessQuantity(state, action)
		case actionsTypes.START_CHANGING_QUANTITY: return startQuantity(state, action)

		case actionsTypes.REMOVE_START: return removeStart(state, action)
		case actionsTypes.REMOVE_SUCCESS:  return removeSuccess(state, action)

		case actionsTypes.AUTH_START: 	return authStart(state, action)
		case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action)
		case actionsTypes.AUTH_FAIL: 	return authFail(state, action)
		case actionsTypes.AUTH_LOGOUT: 	return authLogout(state, action)
		default:
			return state;
	}
} 

export default reducer