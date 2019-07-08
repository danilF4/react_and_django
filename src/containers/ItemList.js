import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import PaginationCom from "../components/Pagination";
import Navigation from '../components/Navigation'
import Smth from '../components/Smth'
class ItemList extends React.Component {
	constructor(props){
		super(props)
		//this.handlePageChange = this.handlePageChange.bind(this)
		this.state = {
			items: [],
			totalItems: null,
			categories: [],
			currentPage: 1,
			postsPerPage:8,
			loading:false,
			home:true
		}
	}

	componentDidMount(){
		console.log(localStorage)
		axios.get('http://127.0.0.1:8000/api/')
		.then(res => {
			this.setState({
				items: res.data,
				totalItems: res.data.length
			})
		})
		axios.get('http://127.0.0.1:8000/api/categories/')
		.then(res => {
			this.setState({
				categories: res.data
			})
		})
	}

	render(){
		const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
		const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
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
		const totalOfItems = this.state.items.length

		const heart = <FontAwesomeIcon icon={faHeart} />
		const cartPlus = <FontAwesomeIcon icon={faCartPlus} />
		const eye = <FontAwesomeIcon icon={faEye} />
		const currentPosts = this.state.items.slice(indexOfFirstPost, indexOfLastPost)
		return(
		  <div style={{ backgroundColor: '#FAFAFA' }}>
		  <Navigation totalPosts={totalOfItems} postsPerPage={this.state.postsPerPage} props={this.props} currentPage={this.state.currentPage} categories={this.state.categories} home={this.state.home} qa={this.state.qa} ab_us={this.state.ab_us}/>
		  <br/>
			<div className="section" style={{ paddingTop: '0px' }}>
			  <div className="container" style={{ border: '1px #ddd solid' }}>	
				<div className="row" style={{ 'border-bottom': '1px solid #ddd', backgroundColor: '#fff' }}>
				<Breadcrumbs/>
				  <div className="col-md-12">
					<div className="section-title">
					  <h3 className="title">New Products</h3>		
					</div>
				  </div>	
				  <div className="col-md-12 col-lg-12">
					<div className="row">
					  <div className="products-tabs">
						<div id="tab1" className="tab-pane active">
						  <div className="products-slick">
							{currentPosts.map((item) => {
					 		return <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
					 		<div className="product slick-slide slick-cloned slick-a" style={{'textAlign': 'center',width: '260px', 'background-color': '#fff', display: 'block', margin: '5px 4px 55px 4px' }}>
							  <Link to={`/item/${item.id}/`}>
								<div className="product-img">	
				  			   	  <img src={item.image} alt={item.title}/>
								</div>
							  </Link>
							  <div className="product-body">
							  {this.state.categories.map(categ => {
							  	if (categ.pk == item.category) {
							  		return <p className="product-category">{categ.category}</p>
							  	}
							  })}
								<h3 className="product-name" style={{ height: '40px' }}><Link to={`/item/${item.id}/`}>{item.title}</Link></h3>
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
					  	<Smth/>
					  </div>
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

export default ItemList;