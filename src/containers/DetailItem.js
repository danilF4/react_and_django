import React from 'react'
import axios from 'axios'
import range from 'lodash/range';

import { message, Button, Carousel } from 'antd';
import ItemsCarousel from 'react-items-carousel';
import Slider from "react-slick";

import Navigation from '../components/Navigation'
import Breadcrumbs from '../components/Breadcrumbs'
import TakeSize from '../components/detail_page/TakeSize'
import ImageDetail from '../components/ImageDetail'
import OtherItems from '../components/OtherItems'
import SimpleSlider from '../components/SliderCom'
import Smth from '../components/Smth'
import Items_Carousel from '../components/detail_page/Items_Carousel'


// DETAIL COMPONENT
class DetailItem extends React.Component {
	// creating the constructor
	constructor(props){
		super(props)
		this.takeSize = this.takeSize.bind(this)
		this.handleAuthentication = this.handleAuthentication.bind(this)
		this.handleAddingToCart = this.handleAddingToCart.bind(this)
		this.state = {
			items:[], // this is for section other items
			item: {}, // detail item

			categories: [], 
			chosen_category: null,
			taken_size: undefined, // for choosing the item's size 
			taken_size2: undefined,
			all_sizes: [], // all sizes that can be chosen for order item
			empty: undefined,

			user_added_items: [],
			user_order_id: null,
			existed: false,

			children: [],
     		activeItemIndex: 0,
		}
	}	
	// TAKES THE SIZE
	takeSize(event){
    	event.preventDefault() // preventing from reloading the page
    	const taken_size = event.target.value // taking the size's id 
    	axios.get('http://127.0.0.1:8000/api/sizes/')
    	.then(res => {
    		res.data.filter(size => {
    			if (size.pk == taken_size) {
    				this.setState({ taken_size2: size.size, taken_size: taken_size, })
    			}
    		})
    	}) // putting that size's id to the state
	}
	// Checks if a user is authenticated
	handleAuthentication(){
		if (localStorage.user_pk === undefined) {
			message.error('Please log in as the user', 5);
		}
	}

	// THIS POSTS THE DATA TO REST FRAMEWORK
	handleAddingToCart(event){
		event.preventDefault(event) // preventing from reloading the page
		this.handleAuthentication()
		// The whole logic
		axios.get('http://127.0.0.1:8000/api-o-i/') // getting the data from Order Item Model 
		.then(order_items => {
			order_items.data.filter(order_item => {
				if (order_item.user == localStorage.user_pk && order_item.size == this.state.taken_size && order_item.item == this.state.item.id) {
					this.setState({ existed:true })
					message.error('You already have this item with chosen size', 5);
					console.log("This item is already added by you")
				}
			}) 
			if (this.state.existed===false) {
					axios.post('http://127.0.0.1:8000/api-o-i/', {
						item:this.state.item.id,
						item_category: this.state.item.category,
						item_title: this.state.item.title,
						item_image: this.state.item.image,
						item_price: this.state.item.price,
						item_size:  this.state.taken_size,
						user:localStorage.user_pk,
						size:this.state.taken_size
					}).then(new_order_item => {
						if (this.state.user_order_id != null) {
							let new_added_items = this.state.user_added_items
							new_added_items.push(new_order_item.data.pk)
							axios.put(`http://127.0.0.1:8000/api-orders/${this.state.user_order_id}/`, {
								user:new_order_item.data.user,
								items:new_added_items,
								ordered_data: "2019-06-28T06:48:00Z",
								ordered: false
							})
							message.success('This item was successuffly added to you wishlist', 5);
							console.log("added new order item ", new_order_item.data.pk, " to the order")
						} else {
							console.log(new_order_item.data.pk)
							axios.post('http://127.0.0.1:8000/api-orders/', {
								user:localStorage.user_pk,
								items:[new_order_item.data.pk],
								ordered_data: "2019-06-28T06:48:00Z",
								ordered: false
							}).then( created_order => { localStorage.setItem('user_order_id', created_order.pk) } )
						  	console.log("created new order item ", new_order_item.data.pk , " with a new order")
						  	this.props.history.push(`/item/${this.state.item.id}`)
						}
					})	
				}
			this.setState({ existed:false })
		})
	}
	

	componentDidMount(){
		console.log(localStorage)
		console.log(this.state)
		axios.get('http://127.0.0.1:8000/api-orders/')
		.then(res => {
			res.data.filter(order => {
				if (localStorage.user_pk == order.user) {
					this.setState({
						user_order_id:order.pk,
						user_added_items: order.items
					})
				}
			})
		})
		const itemID = this.props.match.params.itemID // taking the item's id from url
		axios.get(`http://127.0.0.1:8000/api/${itemID}/`) // grabing item from rest framework
		.then(res => this.setState({ item:res.data }) ) // putting it into the state
		axios.get('http://127.0.0.1:8000/api/empty/')
		.then(res => { this.setState({ empty: res.data }) } )
		axios.get('http://127.0.0.1:8000/api/')
		.then(res => { this.setState({ items:res.data, children:res.data }) } )
		axios.get('http://127.0.0.1:8000/api/sizes/') // taking all the sizes from rest framework
		.then(res => { this.setState({ all_sizes: res.data }) })
		axios.get('http://127.0.0.1:8000/api/categories/')
		.then(res => {
			res.data.map(category => { 
				if (category.pk == this.state.item.category) { this.setState({ chosen_category: category.category }) } })
				this.setState({
					categories: res.data
				})
			})

		const createChildren = n => range(n).map(i => <h1>asd</h1>);
 
  		const changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

		this.setState({
      		children: [],
      	    activeItemIndex: 0,
    	});
    	setTimeout(() => {
      		this.setState({
        		children: createChildren(6),
      		})
    	  }, 100);
		}

	render() {
		 const { activeItemIndex, children } = this.state;
		return (
			<div style={{ backgroundColor: '#FAFAFA' }}>

			<Navigation categories={this.state.categories} props={this.props}/><br/>

			  <div className="section">
			    <div className="container" style={{ border: '1px #ddd solid' }}>
			      <div className="row" style={{ 'border-bottom': '1px solid #ddd', backgroundColor: '#fff' }}>

			        <Breadcrumbs categories={this.state.categories} category_through={true} on_detail_item={true} detail_item={this.state.item} />

					<br/><br/>

					<ImageDetail data={this.state.item}/>	

					  <div className="col-md-5 col-sm-5 col-xs-12">
						<div className="product-details">
						{this.state.categories.map(categ => {
							if (this.state.item.category == categ.pk) {
								return <span class="product__info-model">{categ.category}</span>
							}
						})}
						  <h2 className="product-name">«{this.state.item.title}»</h2>
							<div>
							  <h2 className="product-price" >${this.state.item.price}</h2>
							  <span className="product-available">In Stock</span>
							</div>
							<form onSubmit={this.handleAddingToCart}>
							  <div className="product-options">
							  <div style={{ marginBottom: '5px', fontSize: '16px' }}> 
							    <a href="/" className="instruction">Size instruction</a> 
							  </div>
								<TakeSize state={this.state} sizes={this.state.all_sizes} takeSize={this.takeSize} />
							  </div>
							  <div className="add-to-cart col-lg-12 col-md-12 col-sm-12 col-xs-12">							
							  	<div className="product__add-to-basket">
							  	  <div className="row">
							 	  	<button htmlType="submit" class="btn btn-vm btn-block" id="add_to_button">Add to wishlist</button>
							  	  </div>
								</div>   		
							  </div>
							</form>
						</div>
					  </div>
				    </div>
				    
				    <Items_Carousel items={this.state.items}/>

			  	  </div>
			    </div>
		      </div>
		)
	}
}

export default DetailItem
