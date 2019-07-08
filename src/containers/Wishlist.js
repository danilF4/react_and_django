import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { Empty, Spin, Icon, message } from 'antd';
import Navigation from '../components/Navigation'
import { Link } from 'react-router-dom'
import * as actions from '../store/actions/wishlist'

import Smth from '../components/Smth'
import Intresting from '../components/mightIntrest'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Wishlist extends React.Component {
	constructor(props){
		super(props)
		this.changeQuantityPlus = this.changeQuantityPlus.bind(this)
		this.changeQuantityMinus = this.changeQuantityMinus.bind(this)
		this.removeItem = this.removeItem.bind(this)
		this.changeSize = this.changeSize.bind(this)
		this.get_state = this.get_state.bind(this)
		this.get_sum = this.get_sum.bind(this)
		this.state = {
			categories: [], 
			all_sizes: [], // all sizes that can be chosen for order item

			user_id: null,
			user_order_id: null,

			order_items: [],
			items: [],
			items_price: 0,

			empty: [],
			loading: false
		}
	}

	changeSize(item){
		console.log("changed size")
		const size_pk = document.getElementById(`change_size_${item.pk}`).value;
		this.state.items.filter(item_ => {
			if (item_.pk == item.pk) {
				console.log(item_.pk, item.pk)
				this.state.all_sizes.filter(size => {
					if (size.pk == size_pk) {
						console.log(size.pk, size_pk)
						this.props.sizeChanging(item, size.pk)
						item_.size = size.pk
						item_.item_size = size.size
						console.log('an item after mutating: ', item_)
						return item_
					}
					
				})
			}
		})
	}

	changeQuantityPlus(item){
		this.state.items.filter(item_ => {
			if (item_.pk == item.pk && item_.quantity <= 99) {
				item_.quantity = item_.quantity + 1
				console.log(item)
				this.props.change_quantity_plus(item)
				return item_
			}
			this.setState({
				items: [...this.state.items]
			})
		})
	}

	changeQuantityMinus(item){
		this.state.items.filter(item_ => {
			if (item_.pk == item.pk  && item_.quantity >= 1) {
				item_.quantity = item_.quantity - 1
				console.log(item)
				this.props.change_quantity_minus(item)
				return item_
			}
			this.setState({
				items: [...this.state.items]
			})
		})
	}

	removeItem(item_pk){
		console.log('removing an item')
		const newItems = this.state.items.filter(item => {
			return item.pk !== item_pk
		})
		this.setState({ items: [...newItems] })
		this.props.remove_item(item_pk)
		message.success("You have removed an item from your cart")
	}

	get_state() {
		console.log(this.state)
	}

	get_sum(){
		this.state.items.filter(item => {
		var item_price = item.quantity * item.price
		let items_price = items_price + item_price
 	})
	}



	componentDidMount(){
	console.log(localStorage)
	console.log(this.props)
	axios.get('http://127.0.0.1:8000/api/empty/')
	.then(res => { this.setState({ empty:res.data }) })
	this.setState({ user_id: localStorage.user_pk, user_order_id: localStorage.user_order_id })
	axios.get('http://127.0.0.1:8000/api/sizes/')
		.then(res => { this.setState({ all_sizes: res.data }) })
	axios.get('http://127.0.0.1:8000/api/categories/')
		.then(res => { this.setState({ categories: res.data }) })
	axios.get('http://127.0.0.1:8000/api-orders/') // here i'm getting only id of items that are in the Order Model
	.then(res => {
		res.data.filter(order => {
			if (order.pk == localStorage.user_order_id) {   
				this.setState({
					order_items:order.items
				}, function(){
					axios.get('http://127.0.0.1:8000/api-o-i/')
					.then(order_items => {
						order_items.data.filter(order_item => {
							this.state.order_items.filter(my_order_item => {
								if (my_order_item == order_item.pk) {
									console.log(order_item, order_item.quantity)
									this.setState({
										items: [...this.state.items, order_item],
										items_price: this.state.items_price + (order_item.item_price * order_item.quantity)
									})
								}
							})
						})
					})
				})
			}
		})
	  })
	}

	render() {
		const success = () => {
  		  message
    		.loading('Action in progress..', 2.5)
    		.then(() => message.success('Loading finished', 2.5))
    		.then(() => message.info('Loading finished is finished', 2.5));
		};

		return (
			<div style={{ backgroundColor: '#FAFAFA' }}>
			  <Navigation categories={this.state.categories} props={this.props}/> <br/>
			  <div className="section">
			    <div className="container" style={{ border: '1px #ddd solid', backgroundColor: '#fff' }}>
			      <div className="row">
			        <div id="cart">
			        
			        <div>
			        	{
			        		this.props.loading ?

			        		<Spin indicator={antIcon} /> 
			        	:
			        		<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" style={{ marginBottom: '40px' }}>
			            <div className="main-wish-list"> 
			            {this.state.items.map(item => {
			            	var item_price = item.quantity * item.item_price
			              return <div className="order-item">
			                <div className="col-lg-3 col-md-4 col-sm-4 col-xs-4">
			                  <div className="order-item-image">
			                    <img style={{ width: '195px' }} alt={item.item_image} src={item.item_image} />
			                  </div>
			                </div>
			                
			                <div className="col-lg-6 col-md-5 col-sm-5 col-xs-5">
			                {this.state.categories.map(categ => {
			                	if (categ.pk == item.item_category) {
			                		return <a href="#" className="order-item-title">{categ.category} | {item.item_title}</a>
			                	}
			                })}
			                  <form>
			                  <div>
			                    <div class="col-md-12 col-sm-12 col-xs-12 order-item-field">
			                  	  <div class="form-group">
			                  	    <label onClick={this.get_state} class="control-label col-sm-4 col-xs-4">Size:</label>
			                  	    <div class="col-lg-6 col-md-8 col-sm-8 col-xs-8">
			                  	      <select onChange={() => this.changeSize(item)} id={`change_size_${item.pk}`} class="form-control size">
			                  	      {this.state.all_sizes.map(size => {
			                  	      	if (item.size === size.pk) {
			                  	      		return <option selected size={size.size} value={size.pk}>{size.size}</option>
			                  	      	} else {
			                  	      		return <option size={size.size} value={size.pk}>{size.size}</option>
			                  	      	}
			                  	      })}
			                  	      </select>
			                  	    </div>
			                  	  </div>
			                  	  </div>
			                  	  <div class="col-md-12 col-sm-12 col-xs-12">
			                  	    <div class="form-group">
			                  	  	  <label class="control-label col-sm-4 col-xs-3">Quantity:</label>
			                  	  		<div class="col-sm-8  col-xs-9">
			                  	  		  <a onClick={() => this.changeQuantityMinus(item)} class="btn btn-xs btn-info count-button">–</a>
			                  	  		  <input type="tel" maxlength="2" class="my-form-control count" value={item.quantity}/>
			                  	  		  <a onClick={() => this.changeQuantityPlus(item)} class="btn btn-xs btn-info count-button">+</a>
			                  	  		</div>
			                  	  	  </div>
			                  	  </div>
			                  	</div>
			                  </form>
			                </div>
			                <div class="col-lg-3 col-sm-3 col-md-3 col-xs-3 text-center">
			                  <p class="actions text-right">
			                    <div to="#" class="delete" onClick={() => this.removeItem(item.pk)}>
			                      <i class="fa fa-times"></i>
			                      <span value={item.pk} class="">Remove</span>
			                    </div>
			                  </p>
			                  <p class="sum">
			                    <span>{item.quantity} thing × ${item.item_price}</span>
			                  </p>
			                  <p class="total">${item_price}</p>
			                </div>
			              </div>
			        
			            })}
			            </div>

			            <div class="row total-amount">
			              <div class="col-sm-6 text-center" style={{ margin: '5px 0' }}>
			                
			              </div>
			              <div class="col-sm-6 text-right amount" id="cart_sum">Итого:
			                <i class="hidden" style={{display: 'inline'}}></i>
			                <b>
			                	 ${this.state.items_price}
			                </b>
			                <p  onClick={this.get_state} class="help-block">Стоимость без учета доставки.</p>
			              </div>
			            </div>

			            <div class="row buttons">
			              <div class="col-sm-6 text-center hidden-xs hidden-sm" style={{ margin: '5px 0' }}>
			                <a class="btn btn-default" style={{ borderRadius: '3px'}} href="/">&lt; Вернуться к выбору</a>
			              </div>
			              <div class="col-sm-6">
			                <a onClick={success} class="btn btn-lg btn-block btn-vm make-order" style={{ color: '#fff' }} href="#">Оформить заказ</a>
			              </div>
			              <div class="col-sm-6 text-center hidden-md hidden-lg" style={{ margin: '5px 0' }}>
			                <a class="btn btn-default" href="/">&lt; Вернуться к выбору</a>
			              </div>
			            </div>
			          </div>	
			        	}
			          <Intresting />
			         </div>
			        
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    loading:state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove_item: (item_pk) => dispatch(actions.removeItem(item_pk)),
    change_quantity_plus: (item) => dispatch(actions.changedQuantityPlus(item)),
    change_quantity_minus: (item) => dispatch(actions.changedQuantityMinus(item)),
    sizeChanging: (item, size_pk) => dispatch(actions.sizeChanging(item, size_pk))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)