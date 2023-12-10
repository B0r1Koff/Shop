import React from "react";
import OrderItem from "./OrderItem";
import "./Profile.css"
import { resetOrder, updateOrder } from "../../http/ordersAPI";

const OrderComponent = ({number, orderItems }) => (
    <div>
    <h3>Заказ #{number}</h3>
    {orderItems.map((item, index) => (
      <OrderItem key={index} item={item} />
    ))}
    <p>Статус: {orderItems[0].status}</p>
    <button className="edit-button" onClick={(e) => {
        orderItems.map(item => {
            const response = updateOrder(item.id, item.cost, item.number, item.quantity, "отменен", item.product, item.user)
            console.log(response);
        })
    }}>Отменить</button>
  </div>
  );

  export default OrderComponent