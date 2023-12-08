import React from "react";
import OrderItem from "./OrderItem";
import "./Profile.css"

const OrderComponent = ({ number, orderItems }) => (
    <div>
    <h3>Заказ #{number}</h3>
    {orderItems.map((item, index) => (
      <OrderItem key={index} item={item} />
    ))}
    <p>Статус: {orderItems[0].status}</p>
    <button className="edit-button">Отменить</button>
  </div>
  );

  export default OrderComponent