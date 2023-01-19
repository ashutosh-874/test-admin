import React, { useState, useEffect } from 'react'
import { ORDERS_URL } from '../api'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';

import Loader from '../components/Loader'

const statusArray = {
	"1": "Payment Done",
	"2": "Delivery Forwarded to Dealer",
	"3": "Dealer Confirmed"
}


const OrderDetail = () => {

    const [order, setOrder] = useState(null)

    const {orderId} = useParams()

    useEffect(() => {
        axios.get(`${ORDERS_URL}/${orderId}`)
		.then(function (response) {
			// handle success
			setOrder(response.data.data)
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			alert(error);
		})
    }, [])


    const getFullDate = (string) => {
        return string.date_time.getDate() + "-" + string.date_time.getMonth() + "-" + string.date_time.getFullYear()
    }






    return (
        <div className="container my-5">
			
            <h2 className="text-center">Order Detail</h2>

            <div className="row">
            {
					order
					?
                    <>
                    <p>
                        User Mobile: {order.user_mobile}
                    </p>
                    <p>
                        Address Line 1: {order.address}
                    </p>
                    <p>
                        Address Line 2: {order.address2}
                    </p>
                    <p>
                        Address Line 3: {order.address3}
                    </p>
                    <p>
                        State: {order.state}
                    </p>
                    <p>
                        City: {order.city}
                    </p>
                    <p>
                        PIN: {order.pin}
                    </p>
                    <p>
                        Dealer Id: {order.dealer_id}
                    </p>
                    <p>
                        Estimated Delivery Date: {order.estimated_delivery_date}
                    </p>
                    <p>
                        Promised Delivery Date: {order.promised_delivery_date}
                    </p>
                    <p>Status History:</p>
                    <table className="table table-hover table-striped ">
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Status</th>
							</tr>
						</thead>
						<tbody>
							{
							order.order_history.map(history => (
								<tr className="table-active" key={history.status}>
									<td scope="row">{history.date_time.substr(0, 10)}</td>
									<td>{statusArray[history.status]}</td>
								</tr>
							))
							}						
						</tbody>

					</table>
                    <p>Paid amount: Rs {order.payment.amount / 100}</p>
                    <p>rto: {order.price_breakdown.rto} </p>
                    <p>ex_showroom_price: {order.price_breakdown.ex_showroom_price}</p>
                    <p>fast_tag: {order.price_breakdown.fast_tag}</p>
                    <p>insurance: {order.price_breakdown.insurance}</p>
                    </>
					:
					<Loader />
				}
            </div>


        </div>
    )
}

export default OrderDetail