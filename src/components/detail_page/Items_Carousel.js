import React from 'react'
import Slider from "react-slick";

const Items_Carousel = (props) => {
	const settings ={
			dots: true,
      		infinite: true,
      		speed: 250,
      		slidesToShow: 4,
      		slidesToScroll: 1,
      		slickDots:4,
      		responsive: [
        {
          breakpoint:1200,
          settings: {
            slidesToShow:4,
            slidesToScroll:1,
            infinite:true,
            dots: true,
            slickDots:4,
            initialSlide:8
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            slickDots:4,
            initialSlide: 8,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            initialSlide: 8,
            infinite: true,
            dots: true,
            slickDots:4,
          }
        },
        {
          breakpoint: 530,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
		}
    console.log(props.items)
	return (
		<div className="row" style={{ padding: '25px 50px', backgroundColor: '#fff' }}>
			<div className="container center" style={{ textAlign:'center', padding: '0px 0px', width:'100%' }}>
        	  <Slider {...settings} style={{ textAlign: 'center' }}>
        		{props.items.map(item => {
          		  return <div className="center other-items" style={{ textAlign: 'center', width:'100%' }}>
            		<a href={`/item/${item.id}/`}><img alt={item.title} className="center" style={{ width: '170px', textAlign:'center', border: '1px #F2F2F2 solid', marginBottom: '10px' }} src={item.image} /></a>
            		<a style={{ fontSize: '15px', color: '#666', marginTop: '10px' }} href={`/item/${item.id}/`}>{item.item_category}</a>
            		<a style={{ fontSize: '15px', color: '#666', marginTop: '10px' }} href={`/item/${item.id}/`}>{item.title}</a>
          		  </div>
        		})}
        	  </Slider>
      		</div>
		</div>
	)
}

export default Items_Carousel