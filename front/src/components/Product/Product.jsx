import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../http/productAPI";
import "./Product.css"
import { getProductsCharacteristics } from "../../http/characteristicAPI";
import { createReview, deleteReview, getAllReviews } from "../../http/reviewAPI";

const Product = ({user}) => {
    const {id} = useParams()
    const [product, setProduct] = useState([])
    const [reviews, setReviews] = useState([])
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(1);
    const [characteristics, setCharacteristics] = useState([])
    const [isCommenting, setIsCommenting] = useState(false)

    useEffect(() => {
        setTimeout(() => {
           getProductById(id).then(function(val){setProduct(val.data)})
        }, 10)  
    }, [])
    useEffect(() => {
        setTimeout(() => {
           getProductsCharacteristics(id).then(function(val){setCharacteristics(val.data)})
        }, 10)  
    }, [])
    useEffect(() => {
        setTimeout(() => {
           getAllReviews(id).then(function(val){setReviews(val.data)})
        }, 10)  
    }, [])

    const getImg = (image) => {
        return "data:image/jpeg;base64,"+image.body
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
      };
    
      const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value, 10));
      };
    
  const averageRating = () => {
    if (reviews.length === 0) return 0;

    let sum = 0
    
    reviews.map(review => {
        sum = sum+review.grade
    })

    return sum / reviews.length;
  };
    
    return(
        <div>
            {
                product.map(item => {
                    return (
                        <div className="product-container">
                            <img src={getImg(item.image)} className="product-image" />

                            <div className="product-details">
                                <h1 style={{ color: '#c000b2aa' }}>{item.name}</h1>

                                <div className="product-ratings">
                                    <p style={{ color: '#8a2be2' }}>Рейтинг: {averageRating().toFixed(1)}</p>
                                </div>

                                <ul className="product-features">
                                    {characteristics.map((feature, index) => (
                                        <li key={index}>{feature.name}: {feature.value}</li>
                                    ))}
                                </ul>

                                <div className="product-comments">
                                    <h3 style={{ color: '#8a2be2' }}>Отзывы</h3>

                                    {isCommenting ? (
                                        <div className="comment-input">
                                            <label htmlFor="ratingSelect" style={{ color: '#c000b2aa' }}>
                                            Rating:
                                            </label>
                                            <select id="ratingSelect" value={rating} onChange={handleRatingChange}>
                                                {[1, 2, 3, 4, 5].map((value) => (
                                                    <option key={value} value={value}>
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                            <textarea
                                                placeholder="Комментарий..."
                                                value={comment}
                                                onChange={handleCommentChange}
                                            />
                                            <button onClick={async(e) => {
                                                if(comment === ""){
                                                    alert("Напишите комментарий")
                                                    return
                                                } else{
                                                    const responce = await createReview(rating, comment, item.id, user.id)
                                                    console.log(responce);
                                                    setIsCommenting(false)
                                                }
                                            }}>Сохранить</button>
                                            <button onClick={(e) => setIsCommenting(false)}>Отмена</button>
                                        </div>
                                    ) : (
                                        <button onClick={(e) => {
                                            if(reviews.find(review => review.user.id === user.id)) {
                                                alert("Вы уже оставили отзыв")
                                                return
                                            }
                                            else{                                            
                                                setIsCommenting(true)
                                            }
                                        }}>Оставить комментарий</button>
                                    )}

                                    <ul>
                                        {reviews.map((comment, index) => (
                                            <li key={index} className="comment-item">
                                                <div className="comment-rating" style={{ color: '#c000b2aa' }}>
                                                Рейтинг: {comment.grade}
                                                </div>
                                                <div className="comment-text">{comment.text}</div>
                                                <div className="comment-user">Пользователь: {comment.user.email}</div>
                                                {
                                                    comment.user.id === user.id &&
                                                    <button onClick={async(e) => {
                                                        const responce = await deleteReview(comment.id)
                                                        console.log(responce);
                                                    }}>Удалить</button>
                                                }
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Product