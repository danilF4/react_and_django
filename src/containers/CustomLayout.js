import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import * as actions from '../store/actions/auth'
import { connect } from 'react-redux'
import axios from 'axios'
import {message} from 'antd'


import "bootstrap/dist/css/bootstrap.min.css"
import "../new_static/css/slick.css"

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "../new_static/css/style.css"
import "../new_static/css/very_my_style.css"
//import "../new_static/css/mystyle2.css"

class CustomLayout extends React.Component {
	componentDidMount() {
		axios.get('http://127.0.0.1:8000/api/categories/')
		axios.get('http://127.0.0.1:8000/api-orders/')
		.then(res => {
		  res.data.filter(order => {
			if (order.user == localStorage.user_pk) {
			  localStorage.setItem('user_order_id', order.pk)
			}
		  })
		})
	}

	message_login(event){
		event.preventDefault(event)
		message.error("You are not logged in, to see the wishlist")
	}

	render() {
		const {isAuthenticated} = this.props
		const user_email = localStorage.getItem('email')
		return (
			<div>

			    <Header message_login={this.message_login} user_email={user_email} history={this.props.history} logout={this.props.logout} isAuthenticated={isAuthenticated}/>
				<div>
				  {this.props.children}
			    </div>
			  	<Footer/>
				
				<script src="js/jquery.min.js"></script>
				<script src="js/bootstrap.min.js"></script>
				<script src="js/slick.min.js"></script>
				<script src="js/nouislider.min.js"></script>
				<script src="js/jquery.zoom.min.js"></script>
				<script src="js/main.js"></script>

			  
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default connect(null, mapDispatchToProps)(CustomLayout);
