import React, { useEffect, useState } from "react";
import './Cart.css'
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { createOrder } from "../../http/ordersAPI";

const Cart = observer(({user, cart}) => {

    const [cartItems, setCartItems] = useState([])
    const [userId, setUserId] = useState([])

    useEffect(() => {
      setCartItems(cart.cartItems)
    }, [cart.cartItems])
    useEffect(() => {
      setUserId(user.id)
    }, [user.id])

    const getImg = (image) => {
        return "data:image/jpeg;base64,"+image.body
    }

    return (
        <motion.div 
        
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}

        className="shopping-cart">
      <div className="title">
        Корзина
      </div>
 
    {cartItems.map(item => {

        return(
        <div key={item.id} className="item">
 
        <div className="cart-product-image">
          <img src={getImg(item.product.image)} alt="" />
        </div>
 
        <div className="description">
          <span>{item.product.name}</span>
        </div>
 
        <div className="quantity">
          <button className="plus-btn" type="button" name="button" onClick={(e) => {
            cart.updateCartItemQuantity(item.product.id, 1)
          }}>+</button>
            <input type="text" name="name" readOnly value={item.quantity}/>
          <button className="plus-btn" type="button" name="button" onClick={(e) => {
            cart.updateCartItemQuantity(item.product.id, -1)
          }}>-</button>
        </div>
 
        <div className="total-price">{item.product.price * item.quantity} BYN</div>
      </div>
        )
    })}
      {
        cartItems.length !== 0 &&
        <button className="save-order" onClick={async(e) => {
          const number = Math.floor(Math.random() * (1000000 - 1 + 1)) + 1
          cartItems.map(item => {
            if(item){
              const responce = createOrder(item.product.price*item.quantity, number, item.quantity, "оформлен", item.product.id, userId)
            }
          })
          cart.clearCart()
        }}>Оформить заказ</button>
      }
      </motion.div>        
      
    );
  })

export default Cart