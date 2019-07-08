import React from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faTruck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Smth = () => {
	const service = <FontAwesomeIcon icon={faUsers} />
	const delivery = <FontAwesomeIcon icon={faTruck} />
	const shield = <FontAwesomeIcon icon={faCheckCircle} />
	return (
		<div class="col-xs-12 col-lg-12 wrap" style={{ borderTop: '1px #D10024 solid',paddingBottom: '30px' }}>
		  <div class="row" style={{ }}>
            <div class="col-md-4">
                        <div class="top-footer-item dignity-guarantee">
                        	<span style={{ fontSize: '88px', color: '#FE0087' }}>{shield}</span>
                            <div class="top-footer-item__title">Гарантия</div>
                            <p>Качественные экологичные материалы.<br/>Контроль каждого изделия</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="top-footer-item dignity-delivery">
                        	<span style={{ fontSize: '88px', color: '#FE0087' }}>{delivery}</span>
                            <div class="top-footer-item__title">Доставка</div>
                            <p>Быстрая доставка по России.<br/>Доставка по всему миру</p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="top-footer-item  dignity-service">
                        	<span style={{ fontSize: '88px', color: '#FE0087' }}>{service}</span>
                            <div class="top-footer-item__title">Сервис</div>
                            <p>Лёгкий процесс оплаты,<br/> обмена и возврата</p>
                        </div>
                    </div>
                
            </div>
        </div>
	)
}

export default Smth