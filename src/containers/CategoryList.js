import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PaginationCom from "../components/Pagination";
import Navigation from '../components/Navigation'
import Smth from '../components/Smth'
class CategoryList extends React.Component {
	constructor(props){
		super(props)
		//this.handlePageChange = this.handlePageChange.bind(this)
		this.state = {
			items: [],
			chosen_category: null,
			categories:[],
			currentPage: 1,
			postsPerPage:8,
			loading:false
		}
	}

	handleCategoryChange(){
		console.log(localStorage)
		const categoryID = this.props.match.params.categoryID
		axios.get('http://127.0.0.1:8000/api/')
		.then(res => {
			res.data.map(item => {
				if (item.category == categoryID) {
					this.setState({
						items: [...this.state.items, item],
					})
				}
			})
		})
		axios.get('http://127.0.0.1:8000/api/categories/')
		.then(res => {
			res.data.map(category => {
				if (category.pk == categoryID) {
					this.setState({
						chosen_category: category.category
					})
				}
			})
			this.setState({
				categories: res.data
			})
		})
	}

	componentDidMount(){
		console.log(localStorage)
		const categoryID = this.props.match.params.categoryID
		axios.get('http://127.0.0.1:8000/api/')
		.then(res => {
			res.data.map(item => {
				if (item.category == categoryID) {
					this.setState({
						items: [...this.state.items, item],
					})
				}
			})
		})
		axios.get('http://127.0.0.1:8000/api/categories/')
		.then(res => {
			res.data.map(category => {
				if (category.pk == categoryID) {
					this.setState({
						chosen_category: category.category
					})
				}
			})
			this.setState({
				categories: res.data
			})
		})
	}

	render() {
		const categoryID = this.props.match.params.categoryID
		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
		const currentPosts =this.state.items.slice(indexOfFirstPost, indexOfLastPost)

		const paginate = (pageNumber) => {
			this.setState({
				currentPage:pageNumber
			})
		}

		const toFirstPage = () => {
			this.setState({
				currentPage:1
			})
		}

		const toLastPage = () => {
			this.setState({
				currentPage: this.state.items.length / this.state.postsPerPage
			})
		}

		const category = this.state.chosen_category

		const heart = <FontAwesomeIcon icon={faHeart} />
		const cartPlus = <FontAwesomeIcon icon={faCartPlus} />
		const eye = <FontAwesomeIcon icon={faEye} />
		const next = <FontAwesomeIcon icon="next" />
		return (
		  <div style={{ backgroundColor: '#FAFAFA' }}>
		  <Navigation categoryID={categoryID} props={this.props} categories={this.state.categories} handlePageChange={this.handlePageChange}/>
		  <br/>
			<div className="section" style={{ paddingTop: '0px' }}>
			  <div className="container" style={{ border: '1px #ddd solid' }}>	
				<div className="row" style={{ 'border-bottom': '1px solid #ddd', backgroundColor: '#fff' }}>
				<Breadcrumbs category={this.state.chosen_category} on_category={true}/>
				  <div className="col-md-12">
					<div className="section-title">
					  <h3 className="title">New Products</h3>		
					</div>
				  </div>	
				  <div className="col-md-12 col-lg-12">
					<div className="row">
					  <div className="products-tabs">
						<div id="tab1" className="tab-pane active">
						  <div className="products-slick" data-nav="#slick-nav-1" style={{ textAlign: 'center' }}>
							{currentPosts.map((item) => {
					 return <div className="col-lg-3 col-md-4 col-sm-4 col-xs-6">
					 <div className="product slick-slide slick-cloned slick-active" aria-hidden="false" style={{ display: 'block', 'textAlign': 'center',width: '260px', 'background-color': '#fff', 'margin-buttom': '40px' }}>
							  <Link to={`/item/${item.id}/`}>
								<div className="product-img">	
				  			   	  <img src={item.image} alt=""/>
								</div>
							  </Link>
							  <div className="product-body">
							  {this.state.categories.map(category => {
							  	if (category.pk == item.category) {
							  		return <p className="product-category">{category.category}</p>	
							  	}
							  })}
								<h3 className="product-name" style={{ height: '40px' }}><Link to={`/item/${item.id}/`} tabindex="0">{item.title}</Link></h3>
								<h4 className="product-price">${item.price}</h4>
							  </div>
							  <div className="add-to-cart">
								<button className="add-to-cart-btn" tabindex="0">{cartPlus} Look closer</button>
				  			  </div>
							</div>
							</div>
							})}		
						  </div>
						</div>
						<div style={{textAlign:'center' }}>
						<PaginationCom toLastPage={toLastPage} toFirstPage={toFirstPage} paginate={paginate} postsPerPage={this.state.postsPerPage} currentPage={this.state.currentPage} totalPosts={this.state.items.length} />
					  	<div>
					  </div>
					  <Smth/>
					</div>
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

export default CategoryList;