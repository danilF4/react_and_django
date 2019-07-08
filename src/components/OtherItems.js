import React from 'react'
import axios from 'axios'
//import Slider from 'react-slider'
import SimpleSlider from './SliderCom'
class OtherItems extends React.Component {
  
  state = {
    items: []
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/')
    .then(res => {
      this.setState({
        items:res.data
      })
    })
  }
  render(){
		return (
		  <div className="row" style={{ backgroundColor: '#fff' }}>
			  <div class="wrap row">
          <div class="col-md-12 col-sm-12">
          <div>
            <div class="product-related__title">Other items</div>
          </div>
          </div>
        </div>
			<div class="product__carousel-related product-carousel">
        <div class="product__carousel-related-holder">
          <div class="wrap row">
            <div class="col-md-12">
              <div class="product-carousel__newloader newloader text-center hidden">
                <div class="clear-loading loading-effect-2">
                  <span></span>
                </div>
                <h3>Загрузка</h3>
              </div>
              <div class="product__carousel-related-tabs hidden-xs owl-carousel owl-theme" id="owl-menu-category" style={{opacity: '1', display: 'block'}}>         
                <div class="owl-controls clickable" style={{display: 'none'}}>
                  <div class="owl-pagination">
                    <div class="owl-page">
                      <span class=""></span>
                    </div>
                  </div>
                  <div class="owl-buttons">
                   <div class="owl-prev disabled">
                     <i class="fa fa-angle-left"></i>
                    </div>
                  <div class="owl-next disabled">
                    <i class="fa fa-angle-right"></i>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap row">
          <div class="col-md-12">
            <div class=" product__carousel-related-content" id="owl-product-types">
    	        <div id="related-items-wrapper" class="manshort owl-carousel owl-theme" style={{opacity: '1', display: 'block'}}>
                <div class="owl-wrapper-outer">
                  <div class="owl-wrapper" style={{ left: '0px', display: 'block', transition: 'all 0ms ease 0s', transform: 'translate3d(0px, 0px, 0px)'}}>
                  <SimpleSlider/>
                  </div>
        				</div>
        			</div>
        		  <div class="owl-controls clickable" style={{display: 'none'}}>
        	 	    <div class="owl-pagination">
        		      <div class="owl-page" style={{width: '3363px'}}>
        			    <span class=""></span>
        			  </div>
        			</div>
        			<div class="owl-buttons">
        			  <div class="owl-prev disabled">
        	   	        <i class="fa fa-angle-left"></i>
        		      </div>
        			  <div class="owl-next disabled">
        			    <i class="fa fa-angle-right"></i>
        			  </div>
        			</div>
        		  </div>
        		</div>
           	  </div>
            </div>
          </div>
        </div>
		)}
	}
export default OtherItems