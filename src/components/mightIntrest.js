import React from 'react'


const Intresting = (props) => {
	return (
		<div class="rightpad col-md-4 hidden-xs hidden-sm">
		  <div class="recommended">
			<div class="recommended__title">Might interest you:</div>
			  <div class="related-item">
			    <div class="related-item__preview">
			      <a href="/product/manshortfull/917740?color=white">
			        <img class="related-item__preview-image" src="https://storage.vsemayki.ru/images/0/0/917/917740/previews/people_4_manshortfull_front_white_250.jpg" alt="Брызги красок"/>
			      </a>
			    </div>
			    <div class="related-item__design">
			      <a class="related-item__name" href="/product/manshortfull/917740?color=white">Брызги красок</a>
	              <p class="related-item__info">Мужская футболка 3D</p>
			      <p class="related-item__info">990 руб.</p>
			      <button class="related-item__button" type="button">Добавить в&nbsp;корзину</button>
			    </div>
			  </div>
			  <div class="related-item">
			    <div class="related-item__preview">
			      <a href="/product/manshortfull/1548779?color=white">
			        <img class="related-item__preview-image" src="https://storage.vsemayki.ru/images/0/1/1548/1548779/previews/people_4_manshortfull_front_white_250.jpg" alt="СТАЛЬНАЯ БРОНЯ"/>
			      </a>
			    </div>
			    <div class="related-item__design">
			      <a class="related-item__name" href="/product/manshortfull/1548779?color=white">СТАЛЬНАЯ БРОНЯ</a>
			      <p class="related-item__info">Мужская футболка 3D</p>
			      <p class="related-item__info">990 руб</p>
			      <button class="related-item__button" type="button">Добавить в&nbsp;корзину</button>
			    </div>
			  </div>
			  <button class="recommended__reload" type="button">
			    <i class="fa fa-refresh recommended__fa"></i>
			  <span>Ещё рекомендации</span>
		    </button>
          </div>
		</div>
	)
}

export default Intresting