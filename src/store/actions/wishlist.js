import * as actionTypes from './actionsTypes'
import axios from 'axios'
import { message } from 'antd';
import { Redirect } from 'react-router-dom'

// REMOVING THE ITEMS FROM THE WISHLIST 
export const removeStart = () => {
	return {
		type:actionTypes.REMOVE_START
	}
}

export const removeItem = (item_pk) => {
	return dispatch => {
		dispatch(removeStart());
		axios.delete(`http://127.0.0.1:8000/api-o-i/${item_pk}`, {
			detail: item_pk
		})
		dispatch(removeSuccess())
	}
}

export const removeSuccess = () => {
	return {
		type: actionTypes.REMOVE_SUCCESS,
	}
}



export const quantityStart = () => {
	return {
		type: actionTypes.START_CHANGING_QUANTITY
	}
}

export const changedQuantityPlus = (item) => {
	return dispatch => {
		dispatch(quantityStart());
		axios.put(`http://127.0.0.1:8000/api-o-i/${item.pk}/`, {
			item:item.item,
			size: item.size,
			user: item.user,
			quantity: item.quantity
		}).then(
			dispatch(changedQuantitySuccess())
		)
	}
}

export const changedQuantityMinus = (item) => {
	return dispatch => {
		dispatch(quantityStart());
		axios.put(`http://127.0.0.1:8000/api-o-i/${item.pk}/`, {
			item:item.item,
			size: item.size,
			user: item.user,
			quantity: item.quantity 
		})
		console.log(item.quantity)
		dispatch(changedQuantitySuccess())
	}
}

export const changedQuantitySuccess = () => {
	return {
		type: actionTypes.CHANGED_QUANTITY_SUCCESS
	}
}

export const changedQuantityFail = () => {
	return {
		type: actionTypes.CHANGED_QUANTITY_FAIL
	}
}

export const sizeStart = () => {
	return {
		type: actionTypes.START_SIZE
	}
}

export const sizeChanging = (item, size_pk) => {
	return dispatch => {
		dispatch(sizeStart())
		axios.put(`http://127.0.0.1:8000/api-o-i/${item.pk}/`, {
			item:item.item,
			size: size_pk,
			user:item.user,
			quantity: item.quantity,
		}).then(res => {dispatch(sizeSuccess())})
	}
}

export const sizeSuccess = () => {
	return {
		type:actionTypes.SIZE_SUCCESS
	}
}

