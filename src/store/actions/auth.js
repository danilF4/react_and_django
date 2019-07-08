import * as actionTypes from './actionsTypes'
import axios from 'axios'
import { message } from 'antd';
import { Redirect } from 'react-router-dom'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	}
}

export const logout = () => {
	localStorage.removeItem('user')
	localStorage.removeItem('expirationDate')
	localStorage.removeItem('email')
	localStorage.removeItem('user_pk')
	localStorage.removeItem('token')
	localStorage.removeItem('all_sizes')
	localStorage.removeItem('user_order_id')
	localStorage.removeItem('user_added_items')
	localStorage.removeItem('added_items')
	return {
		type:actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout)
		}, expirationTime * 1000)
	}
}

// LOGIN PROCESS
export const authLogin = (email, password) => {
	return dispatch => {
		dispatch(authStart()); // show that the process has started
		axios.post('http://127.0.0.1:8000/rest-auth/login/', { // login this user using rest framework
			email:email, // email field
			password:password // password field
		})
		.then(res => { // res is the data that comes after the some action
			const expirationDate = new Date(new Date().getTime() + 86400 * 1000); // we create our expiration date
			localStorage.setItem('expirationDate', expirationDate); // after creating expiration date I set it in local storage
			localStorage.setItem('token', res.data.key); // res.data.key is equal to our token 
			// here the user finds its token and then gets its ID
			axios.get(`http://127.0.0.1:8000/tokens/${res.data.key}`)
			.then(res => {
				localStorage.setItem('user_pk', res.data.user) // then we set that ID in our database
			})
			dispatch(authSuccess(res.data.key)) // if everything is great, it shows "Success" in Redux
			dispatch(checkAuthTimeout(3600)) // adding additional hour of expiration date
			axios.get('http://127.0.0.1:8000/api-orders/')
			.then(res => {
				res.data.map(order => {
					if (order.user == localStorage.user_pk) {
						localStorage.setItem('user_order_id', order)
					}
				})
			})
			message.success('You have logged in', 3)
		})
		// cathch any errors
		.catch(err => {
			console.log(err)
			message.error("Somethin went wrong, please check again your password and email", 5)
			dispatch(authFail(err)) // show in redux that it failed
		})
	}
}
// SIGNUP PROCESS
export const authSignup = (email, password1, password2) => {
	return dispatch => {
		dispatch(authStart()); // show that the process has started
		axios.post('http://127.0.0.1:8000/rest-auth/registration/', { // registrate this user using rest framework
			email:email,
			password1:password1,
			password2:password2
		})
		.then(res => {
			const token = res.data.key;
			const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
			localStorage.setItem('token', token);
			localStorage.setItem('expirationDate', expirationDate);
			dispatch(authSuccess(token))
			dispatch(checkAuthTimeout(3600))
		})
		.catch(err => {
			dispatch(authFail(err))
		})
	}
}

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token')
		if (token === undefined) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if (expirationDate <= new Date() ) {
				dispatch(logout());
			} else {
				dispatch(authSuccess(token));
				dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000))
			}
		}
	}
}







































