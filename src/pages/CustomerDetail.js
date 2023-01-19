import React, { useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios';

import { GET_CUSTOMERS_URL, ORDERS_URL } from '../api'
import Loader from '../components/Loader';
import OrderRow from '../components/OrderRow';


const statusArray = {
	"1": "Payment Done",
	"2": "Delivery Forwarded to Dealer",
	"3": "Dealer Confirmed"
}

const CustomerDetail = () => {

    const {customerId} = useParams()
    const [customer, setCustomer] = useState(null)
	const [editing, setEditing] = useState(false)

	const [toUpdateOrderId, setToUpdateOrderId] = useState(null)
	const [dealerId, setDealerId] = useState(null)
	const [status, setStatus] = useState(null)
	const [estimated_delivery_date, setEstimated_delivery_date] = useState(null)
	const [promised_delivery_date, setPromised_delivery_date] = useState(null)

	const updateStates = (orderId) => {
		setToUpdateOrderId(orderId)
		let order = customer.orders.find(order => order.id === orderId)
		console.log(order)
		setDealerId(order.dealer_id)
		setStatus(order.order_history[order.order_history.length-1].status)
		setEstimated_delivery_date(order.estimated_delivery_date ? order.estimated_delivery_date : null)
		setPromised_delivery_date(order.promised_delivery_date ? order.promised_delivery_date : null)
	}

	const startEditing = (orderId) => {
		updateStates(orderId)
		setEditing(true)
	}

    useEffect(() => {
        axios.get(`${GET_CUSTOMERS_URL}/${customerId}`)
		.then(function (response) {
			// handle success
			setCustomer(response.data.data)
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			alert(error);
		})
    }, [])


	const updateOrder = () => {
		axios.post(`${ORDERS_URL}`, {
			"action": "update",
			"payload": {
				"id": toUpdateOrderId,
				"dealer_id": dealerId,
				"status": status,
				"estimated_delivery_date": estimated_delivery_date,
				"promised_delivery_date": promised_delivery_date
			}
		})
		.then(function (response) {
			console.log(response);
			let orderId = toUpdateOrderId
			let order = customer.orders.find(order => order.id === orderId)
			let remOrders = customer.orders.filter(order => order.id != orderId)
			order["dealer_id"] = dealerId
			order["order_history"][order.order_history.length-1] = {...order["order_history"][order.order_history.length-1], "status_text": statusArray[status], "status": status}
			order["estimated_delivery_date"] = estimated_delivery_date
			order["promised_delivery_date"] = promised_delivery_date
			setCustomer({...customer, orders: [...remOrders, order]})
			setEditing(false)
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	const navigate = useNavigate();
	const goToOrderDetailPage = (id) => {
		if(!editing){
			navigate(`/orders/${id}`)
		}
	}
	
    

    return (
        <div className="container my-5">
			<h2 className="text-center">Customer Detail</h2>
			{
				customer ?
				<>
					<div className="row">
						<p>Name: {customer.first_name} {customer.last_name}</p>
						<p>Email: {customer.email}</p>
						<p>Mobile: {customer.mobile}</p>
					</div>
					<div className="row">
						<p>Orders:</p>
						<table className="table table-hover table-striped">
							<thead>
								<tr>
									<th scope="col">Id</th>
									<th scope="col">Payment Status</th>
									<th scope="col">Dealer Id</th>
									<th scope="col">Order Status</th>
									<th scope="col">Estimated Delivery</th>
									<th scope="col">Promised Delivery</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{
								customer.orders.map(order => (
									<OrderRow 
										key={order.id}
										order={order} startEditing={startEditing} editing={editing} setEditing={setEditing}
										toUpdateOrderId={toUpdateOrderId}  updateOrder={updateOrder} goToOrderDetailPage={goToOrderDetailPage}
										dealerId={dealerId} setDealerId={setDealerId}
										status={status} setStatus={setStatus}
										estimated_delivery_date={estimated_delivery_date} setEstimated_delivery_date={setEstimated_delivery_date}
										promised_delivery_date={promised_delivery_date} setPromised_delivery_date={setPromised_delivery_date}
									/>
								))
								}						
							</tbody>

						</table>
					</div>
				</>
				:
				<Loader />
			}
        </div>
    )
}

export default CustomerDetail