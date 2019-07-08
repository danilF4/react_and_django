import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = (props) => {
		return (
		<div id="breadcrumb" className="section" style={{ marginBottom: '0px', borderBottom: '1px #D10024 solid' }}>
		  <div className="container">
			<div className="row">
			  <div className="col-md-12">
				<ul className="breadcrumb-tree">
				  {props.is_home === true ? 
				  	<li className="active">Home</li>
				  : 
				    <li><Link to="/">Home</Link></li>
				  }
				  {props.on_category ? 
				  	<li className="active">{props.category}</li> 
				  :
				  	''
				  }
				  {props.category_through === true ?
				  	props.categories.map(categ => {
				  	  if (categ.pk == props.detail_item.category) {
				  		return <li><Link to={`/category/${props.detail_item.category}`}>{categ.category}</Link></li>
				  	}
				  })
				  	:
				  	''
				  }
				  
				  {props.on_detail_item ? 
				  	<li className="active">{props.detail_item.title}</li>
				  :
				  	''
				  }
				</ul>
			  </div>
			</div>
		  </div>
		</div>
		)
}

export default Breadcrumbs