import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = (props) => {
		const categoryID = props.categoryID
		const home = props.home
		const ab_us = props.ab_us
		const qa = props.qa
		return (
		<nav id="navigation">
		  <div className="container">
			<div id="responsive-nav" className="">
			  <ul className="main-nav nav navbar-nav">
			 	<li  className={`${home == true ? 'active' : ''}`}><Link to="/">Home</Link></li>
			 	{props.categories.map(categ => {
			 		if (categoryID == categ.pk) {
			 			return <li className="active"><Link to={`/category/${categ.pk}/`}
			 			>{categ.category}</Link></li>
			 		} else {
			 			return <li><a href={`/category/${categ.pk}/`}>{categ.category}</a></li>
			 		}	
			 	})}
				<li><Link to={`${props.qa === true ? 'active' : ''}`}>Q&A</Link></li>
				<li><Link to={`${props.ab_us === true ? 'active' : ''}`}>About us</Link></li>
			  </ul>
		    </div>
		  </div>
		</nav>
	)
}
export default Navigation;