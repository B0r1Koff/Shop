import React, { useState } from "react";
import OrderItem from "./OrderItem";
import "./Profile.css"
import { resetOrder, updateOrder } from "../../http/ordersAPI";

const OrderComponent = ({number, orderItems, user }) => {

  const [isChanged, setIsChanged] = useState(false)
  const [status, setStatus] = useState(orderItems[0].status)
  const [startedStatus, setStartedStatus] = useState(orderItems[0].status)

  const handleUpdateStatus = (e) => {
    setStatus(e.target.value);
    if(e.target.value === startedStatus){
      if(isChanged){setIsChanged(!isChanged)}
    }else{
      if(!isChanged){setIsChanged(!isChanged)}
    }
  }

  const handleDeleteOrder = (orderItems) => {
    orderItems.map(item => {
      const response = updateOrder(item.id, item.cost, item.number, item.quantity, "отменен", item.product, item.user)
      console.log(response);
  })
  }
  
  return(
    <div>
      <h3>Заказ #{number}</h3>
      {orderItems.map((item, index) => (
        <OrderItem key={index} item={item}/>
      ))}
    

      {user.role === "user" ?
        <div>
          <p>Статус: {orderItems[0].status}</p>
          <button className="edit-button" onClick={(e) => {handleDeleteOrder(orderItems)}}>Отменить</button>
        </div>

      :
      
        <div>
          <select id="statusSelect" value={status} onChange={(e) => {handleUpdateStatus(e)}}>
            {["оформлен", "собран", "передан курьеру"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button className={isChanged ? "edit-button" : "none-btn"} onClick={(e) => {
            orderItems.map(item => {
              const response = updateOrder(item.id, item.cost, item.number, item.quantity, status, item.product, item.user)
              setIsChanged(false)
              console.log(response);
            })
          }}>Сохранить</button>
        </div>
  
      }
    
    </div>
  );
  
};

  export default OrderComponent