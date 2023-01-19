import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { GET_CUSTOMERS_URL } from '../api';
import Loader from '../components/Loader';

const HomePage = () => {

	const [customers, setCustomers] = useState(null)
	useEffect(() => {
		axios.get(GET_CUSTOMERS_URL)
		.then(function (response) {
			// handle success
			setCustomers(response.data.data)
			console.log(response);
		})
		.catch(function (error) {
			// handle error
			alert(error);
		})
	}, [])
	

	const navigate = useNavigate();
	const goToDetailPage = (id) => {
		navigate(`${id}`)
	}

	return (
		<div className="container my-5">
			<h2 className="text-center">All Customers</h2>

			<div className="row">
				{
					customers
					?
					<table className="table table-hover table-striped">
						<thead>
							<tr>
								<th scope="col">Mobile</th>
								<th scope="col">Email</th>
								<th scope="col">Name</th>
								<th scope="col">Orders Count</th>
							</tr>
						</thead>
						<tbody>
							{
							customers.map(customer => (
								<tr className="table-active" key={customer.id} onClick={() => goToDetailPage(customer.id)}>
									<td scope="row">{customer.mobile}</td>
									<td>{customer.email}</td>
									<td>{customer.first_name} {customer.last_name}</td>
									<td>{customer.orders_count}</td>
								</tr>
							))
							}						
						</tbody>

					</table>
					:
					<Loader />
				}
				
			</div>

		</div>
	)
}

export default HomePage