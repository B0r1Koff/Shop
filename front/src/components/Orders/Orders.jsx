import React, { useEffect, useState } from "react";
import OrdersListComponent from "../Profile/OrdersListComponent";
import { getAllOrders } from "../../http/ordersAPI";

const Orders = ({user}) => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        setTimeout(() => {
          getAllOrders().then(function(val){setOrders(val.data)
        })
       }, 10) 
      }, [])

    return(
        <div className="profile-container">
            <h2 className="profile-header">Заказы</h2>
            <OrdersListComponent orders={orders} user={user}/>
        </div>
    );
}

export default Orders