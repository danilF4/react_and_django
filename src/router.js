import React from 'react'
import { Route } from 'react-router-dom'
import ItemList from './containers/ItemList'
import DetailItem from './containers/DetailItem'
import Login from './containers/Login'
import Signup from './containers/Signup'
import CategoryList from './containers/CategoryList'
import Wishlist from './containers/Wishlist'
const BaseRouter = () => (
	<div>
		<Route exact path='/login/' component={Login}/>
		<Route exact path='/signup/' component={Signup}/>
		<Route exact path='/category/:categoryID/' component={CategoryList}/>
		<Route exact path='/' component={ItemList}/>
		<Route exact path='/item/:itemID/' component={DetailItem}/>
		<Route exact path='/wishlist/' component={Wishlist}/>
	</div>
)

export default BaseRouter;