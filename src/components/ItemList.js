import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons'

class ItemList extends React.Component {

	state = {
		items: []
	}

	componentDidMount(){
		axios.get('http://127.0.0.1:8000/api/')
		.then(res => {
			this.setState({
				items: res.data
			})
			console.log("hhh")
		})
	}

	render(){
		const eye = <FontAwesomeIcon icon={faEye} />
		return(
			<div class="section">
			  <div class="container">				
				<div class="row">
				  <div class="col-md-12">
					<div class="section-title">
				  	  <h3 class="title">New Products</h3>
					  <div class="section-nav">
						<ul class="section-tab-nav tab-nav">
						  <li class="active"><a data-toggle="tab" href="#tab1">T-Shirts</a></li>
					 	  <li><a data-toggle="tab" href="#tab1">Hoodies</a></li>
						  <li><a data-toggle="tab" href="#tab1">Hats</a></li>
					  	</ul>
					  </div>
					</div>
				   </div>
					<div class="col-md-12 col-lg-12">
					  <div class="row">
						<div class="products-tabs">
						  <div id="tab1" class="tab-pane active">
							<div class="products-slick" data-nav="#slick-nav-1" style={{ textAlign: 'center' }}>
							  {this.state.items.map((item) => {
							  return <div class="product slick-slide slick-cloned slick-active col-lg-2 col-md-2 col-sm-4 col-xs-6" aria-hidden="false" style={{'textAlign': 'center',width: '260px', 'background-color': '#fff', 'margin-buttom': '40px' }}>
								<div class="product-img">
								  <img src={item.image} alt=""/>			
								</div>
								<div class="product-body">
					  			  <p class="product-category">{item.category}</p>
								  <h3 class="product-name" style={{ height: '40px' }}><a href="/" tabindex="0">{item.title}</a></h3>
								  <h4 class="product-price">${item.price}</h4>
								  <div class="product-btns">
									<button class="add-to-wishlist" tabindex="0">{heart}<span class="tooltipp">add to wishlist</span></button>
									<button class="add-to-compare" tabindex="0"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
									<button class="quick-view" tabindex="0">{eye}<span class="tooltipp">quick view</span></button>
								  </div>
								</div>
								<div class="add-to-cart">
				  				  <button class="add-to-cart-btn" tabindex="0">{eye} add to cart</button>
								</div>
							  </div>
							})}			
						  </div>
						  <div id="slick-nav-1" class="products-slick-nav"></div>
						</div>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		)
	}
}

export default ItemList;