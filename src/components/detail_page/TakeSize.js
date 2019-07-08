import React from 'react'

const TakeSize = (props) => {
	return (
		<ul class="product__size-list">
			{props.state.all_sizes.map((size) => {
				return <div>
					{props.state.taken_size !== size.pk ? 
						<div onClick={props.takeSize} className="product">  
							<li value={size.pk} class="centered product-li" >
        			  		    <span value={size.pk} value2={size.size}>{size.size}</span>
    				    	</li>		
						</div>
						:
						<div className="product product-taken" >  
		  			   	    <li onClick={props.takeSize} value={size.size} class="centered product-li" >
        					    <span>{size.size}</span>
    		 		  	    </li>		
						</div>
					}
				</div>
			})}
		</ul>
	)
}

export default TakeSize