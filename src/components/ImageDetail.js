import React from 'react'
import '../new_static/css/mystyle.css'

const ImageDetail = (props) => {
	return (
	  <div className="col-md-7 col-sm-7 col-xs-12 img-container">
	  	<div data-autotest="Full" className="_238zeSL_ row">
	  	  <div class="col-sm-2 col-xs-3 col-md-2 hidden-xs ">
            <div class="product__image-preview">
              <div class="swiper-container swiper-container-vertical" id="swiper-thumbnails">
                <div class="swiper-wrapper" style={{height: '75px', marginBottom: '3px'}}>
            	  <div class="swiper-slide swiper-slide-next" style={{height: '75px', marginBottom: '15px'}}>
            		<a href="/">
                	  <img src={props.data.image} alt=""/>
            		</a>
        		  </div>
            	  <div class="swiper-slide swiper-slide-next" style={{height: '75px', marginBottom: '15px'}}>
            	    <a href="/">
                	  <img src={props.data.image} alt=""/>
                    </a>
        		  </div>
            	  <div class="swiper-slide swiper-slide-next" style={{height: '75px', marginBottom: '15px'}}>
            	    <a href="/">
                  	  <img src={props.data.image} alt=""/>
             	    </a>
        		  </div>
            	  <div class="swiper-slide swiper-slide-next" style={{height: '75px', marginBottom: '15px'}}>
            	    <a href="/">
                	  <img src={props.data.image} alt=""/>
            	    </a>
        		  </div>
    		    </div>
              <div class="swiper-vm-button-prev swiper-button-disabled"><i class="fa fa-angle-up"></i></div>
              <div class="swiper-vm-button-next swiper-button-disabled"><i class="fa fa-angle-down"></i></div>
              </div>
            </div>
          </div>
	  	  <div className="col-md-10 col-sm-8 col-xs-8">
	  	    <div className="_3vlrqd4K">
	  	      <img src={ props.data.image } className="kgKPVmuz img-fluid" alt={props.data.title} title={props.data.title}/>
	  	    </div>
	  	  </div>
	  	</div>
	</div>
	)
}
export default ImageDetail