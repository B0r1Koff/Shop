import React from "react";
import OrderComponent from "./OrderComponent";

const groupOrdersByOrderId = (orders) => {
    const groupedOrders = {};

  orders.forEach((order) => {
    if (!groupedOrders[order.number]) {
      groupedOrders[order.number] = [order];
    } else {
      groupedOrders[order.number].push(order);
    }
  });

  return Object.entries(groupedOrders).map(([number, orderItems]) => ({
    number: parseInt(number, 10),
    orderItems,
  }));
  };

const OrdersListComponent = ({ orders }) => {
    const groupedOrders = groupOrdersByOrderId(orders);
    console.log(groupedOrders);
  
    return (
      <div>
        {groupedOrders.map(({ number, orderItems }, index) => (
          <OrderComponent key={index} number = {number} orderItems={orderItems} />
        ))}
      </div>
    );
  };

  export default OrdersListComponent