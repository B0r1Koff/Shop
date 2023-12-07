import React, { useEffect, useState } from "react";
import './Cart.css'
import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";

const Cart = observer(({user, cart}) => {

    const [cartItems, setCartItems] = useState([])
    const [price, setPrice] = useState(0)

    useEffect(() => {
      setCartItems(cart.cartItems)
    }, [cart.cartItems])
    useEffect(() => {
      let fullPrice = 0
      cartItems.map(item => {
          fullPrice += item.product.price * item.quantity
      })
      setPrice(fullPrice)
    }, [cart.cartItems])

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
            <input type="text" name="name" value={item.quantity}/>
          <button className="plus-btn" type="button" name="button" onClick={(e) => {
            cart.updateCartItemQuantity(item.product.id, -1)
          }}>-</button>
        </div>
 
        <div className="total-price">{item.product.price * item.quantity} BYN</div>
      </div>
        )
    })}
        <button className="save-order" onClick={(e) => {
          cartItems.map(item => {
            if(item){
              console.log("aaa");
            }
          })
        }}>Оформить заказ</button>
      </motion.div>        
    );
  })

export default Cart