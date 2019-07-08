import React from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
		const heart = <FontAwesomeIcon icon={faHeart} />
		return(
			<header>
			<div id="top-header">
				<div className="container">
				  <div className="row">
				  <div className="col-xs-12 col-sm-12">
					<ul className="header-links">
						<li className="pull-left"><a href="/"><i className="fa fa-phone"></i> +777 419 502</a></li>
						{
						  props.isAuthenticated ? 
							<li className="pull-right"><Link onClick={props.logout}><i className="fa fa-user-o"></i> Logout</Link></li>
						:
							<li className="pull-right"><Link to="/login/"><i className="fa fa-user-o"></i> Login</Link></li>
						}
						<li style={{ paddingRight: '30px' }} className="pull-right"><a onClick={() => {console.log(props)}} href="#"><i className="fa fa-envelope-o"></i>{props.user_email}</a></li>
					</ul>
					
					</div>
				</div>
			  </div>
			</div>
			<div id="header">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="header-logo">
								<Link to="/" className="logo">
									<img src="https://colorlib.com/preview/theme/electro/img/logo.png" alt=""/>
								</Link>
							</div>
						</div>
						<div className="col-md-6 col-sm-8">
							<div className="header-search">
								<form>
									<input style={{ borderTopLeftRadius: '40px', borderBottomLeftRadius: '40px', width: '80%'  }} className="input" placeholder="Search here"/>
									<button style={{ width: '20%' }} className="search-btn">Search</button>
								</form>
							</div>
						</div>
						<div className="col-md-3 clearfix" style={{ textAlign: 'right' }}>
							<div className="header-ctn">
								<div>
								{
									props.isAuthenticated ?

									<a href="/wishlist/">
									  <div>
									    <span style={{ fontSize: '15px', color: '#F81D08'}}>{heart}</span>
									  </div>
									    <a href="/wishlist/" style={{ color: "#fff" }}><span style={{ fontSize: '12px' }}>Your Wishlist</span></a>	
									</a>
								:
									<a href="#" onClick={props.message_login}>
									  <div>
									    <span style={{ fontSize: '15px', color: '#F81D08'}}>{heart}</span>
									  </div>
									    <a href="#" style={{ color: "#fff" }}><span style={{ fontSize: '12px' }}>Your Wishlist</span></a>	
									</a>
								}
								</div>
								<div>
									<a href="#">
									<div className="qty">
									  <span>0</span>
									</div>
									<span> Your Orders</span>
								  </a>
								</div>

								<div className="dropdown">
									<div className="cart-dropdown">
										<div className="cart-list">
											<div className="product-widget">
												<div className="product-img">
													<img src="./img/product01.png" alt=""/>
												</div>
												<div className="product-body">
													<h3 className="product-name"><a href="/">product name goes here</a></h3>
													<h4 className="product-price"><span className="qty">1x</span>$980.00</h4>
												</div>
												<button className="delete"><i className="fa fa-close"></i></button>
											</div>
											<div className="product-widget">
												<div className="product-img">
													<img src="./img/product02.png" alt=""/>
												</div>
												<div className="product-body">
													<h3 className="product-name"><Link to="/">product name goes here</Link></h3>
													<h4 className="product-price"><span className="qty">3x</span>$980.00</h4>
												</div>
												<button className="delete"><i className="fa fa-close"></i></button>
											</div>
										</div>
										<div className="cart-summary">
											<small>3 Item(s) selected</small>
											<h5>SUBTOTAL: $2940.00</h5>
										</div>
										<div className="cart-btns">
											<Link to="/">View Cart</Link>
											<Link to="/">Checkout  <i className="fa fa-arrow-circle-right"></i></Link>
										</div>
									</div>
								</div>
							</div>
						</div>						
					</div>
				</div>
			</div>
		</header>
		)
	}
export default Header