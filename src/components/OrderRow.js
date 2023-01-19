import React from 'react'

const OrderRow = ({
    order, startEditing, editing, setEditing, toUpdateOrderId, updateOrder, goToOrderDetailPage,
    dealerId, setDealerId,
    status, setStatus,
    estimated_delivery_date, setEstimated_delivery_date,
    promised_delivery_date, setPromised_delivery_date
}) => {
    return (
        <tr className="table-active">
            {
			    editing & toUpdateOrderId===order.id
                ?
                <>
                    <td scope="row">{order.id}</td>
                    <td scope="row">{order.payment.status}</td>
                    <td><select name="dealer_id" value={dealerId} onChange={(e) => setDealerId(e.target.value)}>
                            <option value="D0001">D0001 Santa Singh</option>
                            <option value="D0002">D0002 Banta Singh</option>
                            <option value="D0003">D0003 Jay Singh</option>
                        </select></td>
                    <td>
                        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="1">Payment Done</option>
                            <option value="2">Delivery Forwarded to Dealer</option>
                            <option value="3">Dealer Confirmed</option>
                        </select>
                    </td>
                    <td><input type="date" name="estimated_delivery_date" id="estimated_delivery_date" value={estimated_delivery_date} onChange={(e) => setEstimated_delivery_date(e.target.value)} /></td>
                    <td><input type="date" name="promised_delivery_date" id="promised_delivery_date" value={promised_delivery_date} onChange={(e) => setPromised_delivery_date(e.target.value)} /></td>
                    <td onClick={updateOrder}>
                        <i  className="fa-sharp fa-solid fa-xl fa-check"></i>
                    </td>
                    <td onClick={() => setEditing(false)}>
                        <i  className="fa-solid fa-xl fa-xmark"></i>
                    </td>
                </>
                :
                <>
                    <td onClick={() => goToOrderDetailPage(order.id)} scope="row">{order.id}</td>
                    <td onClick={() => goToOrderDetailPage(order.id)} scope="row">{order.payment.status}</td>
                    <td onClick={() => goToOrderDetailPage(order.id)}>{order.dealer_id}</td>
                    <td onClick={() => goToOrderDetailPage(order.id)}>{order.order_history && order.order_history[order.order_history.length-1]["status_text"]}</td>
                    <td onClick={() => goToOrderDetailPage(order.id)}>{order.estimated_delivery_date}</td>
                    <td onClick={() => goToOrderDetailPage(order.id)}>{order.promised_delivery_date}</td>
                    <td onClick={() => startEditing(order.id)}><i className="fa-regular fa-xl fa-pen-to-square"></i></td>
                    <td></td>
                </>
            }
        </tr>
    )
}

export default OrderRow