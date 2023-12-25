import React from "react";
import "./Profile.css"


const OrderItem = ({ item}) => (
    <div>
      <p>{item.product.name}</p>
      <p>Количество: {item.quantity}</p>
      <p>Цена: {item.cost} BYN</p>
    </div>
  );

  export default OrderItem