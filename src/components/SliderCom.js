import React, { Component } from "react";
import Slider from "react-slick";
import axios from 'axios'

const SimpleSlider = (props) => {

    const settings = {
      dots: true,
      infinite: true,
      speed: 250,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="container center" style={{ textAlign:'center', padding: '0px 40px', width:'100%' }}>
        <Slider {...settings} style={{ textAlign: 'center' }}>
        {this.state.other_items.map(item => {
          return <div className="center" style={{ textAlign: 'center', width:'100%' }}>
            <h4>{item.title}</h4>
            <img alt="" className="center" style={{ width: '170px', textAlign:'center' }} src={item.image} />
          </div>
        })}
        </Slider>
      </div>
    );
}
export default SimpleSlider

