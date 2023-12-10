import React, { useEffect, useState } from "react";
import './ProductCard.css'
import { PRODUCT_ROUTE } from "../../utils/consts";
import { useNavigate } from "react-router-dom";
import { like, unLike } from "../../http/favouritesAPI";
import { getByUserId } from "../../http/favouritesAPI";
import { motion } from "framer-motion";

const ProductCard = ({product, getRateById, getImg, currencyValue, liked, userId, cart, setLiked, user}) => {

    const likedUrl = "public/images/liked.png"
    const unLikedUrl = "public/images/nliked.png"

    const navigate = useNavigate()
    const [likeId, setLikeId] = useState(0)
    const [url, setUrl] = useState(unLikedUrl)
    const [cartButtonValue, setCartButtonValue] = useState("В корзину")

    useEffect(() => {
          liked.map(like => {
            if(product.id === like.product.id){
                setLikeId(like.id)
            }
        })
        liked.find(like => like.product.id === product.id) && setUrl(likedUrl)
    }, [])
    useEffect(() => {
        user && cart.cartItems.find(cartItem => cartItem.product.id === product.id) && setCartButtonValue("Из корзины")
  }, [])

    return(
        <motion.div 

        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        
        className="product-card" 
        
        onClick={(e) => {
            navigate(PRODUCT_ROUTE + "/" + product.id)
        }}>
            <div className="product-image">
                <img src={getImg(product.image)} alt="" />
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-price">{product.price * getRateById(currencyValue)} {currencyValue}</p>
                {user.role === "user" &&
                <div className="prod-buttons">
                    <button className="add-to-cart" onClick={
                        (e)=>{e.stopPropagation()
                        if(!cart.cartItems.find(cartItem => cartItem.product.id === product.id)){
                            cart.addToCart(product)
                            setCartButtonValue("Из корзины")
                        }else{
                            cart.removeFromCart(product.id)
                            setCartButtonValue("В корзину")
                        }
                        }
                        }>{cartButtonValue}</button>
                    <img id={product.id} className="like" src={url} alt="" onClick={async e => {
                        e.stopPropagation()
                        
                        if(userId){
                            if(liked.some(like => like.product.id === product.id)){
                                const response = await unLike(likeId)
                                setUrl(unLikedUrl)
                            }else{
                                const response = await like(product.id, userId)
                                setUrl(likedUrl)
                            }
                            setTimeout(() => {
                                getByUserId(userId).then(function(val){setLiked(val.data)
                              })
                             }, 100)
                        }
                        
                    }}/>
                </div>
                }
                
                
            </div>
        </motion.div>
    )
}

export default ProductCard