import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import './Home.css'
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";

const Home = observer(() => {
    const [value, setValue] = useState('Все категории');
    const [name, setName] = useState('')
    const [currencyValue, setCurrencyValue] = useState('byn')
    const [liked, setLiked] = useState([1, 2, 4])

    const categories = [{id: 1, name: "Ноутбуки"}, {id: 2, name: "Телефоны"}, {id: 3, name: "Кроссовки"}]
    const currency = [{id: 1, name: "byn", rate: 1.0}, {id: 2, name: "rub", rate: 30.0}, {id: 3, name: "usd", rate: 0.3}, {id: 4, name: "eur", rate: 0.24}]
    const likedUrl = "public/images/liked.png"
    const unLikedUrl = "public/images/nliked.png"
    const navigate = useNavigate()


    const products = [
            { id: 1, categoryId: 1, name: "Товар 1", price: 10.00, discount: 10.00, url: "http://img03.taobaocdn.com/bao/uploaded/i3/T1pusNFlxaXXXXXXXX_!!2-item_pic.png" },
            { id: 2, categoryId: 2, name: "Товар 2", price: 20.00, discount: 0.00, url: "https://cache3.youla.io/files/images/780_780/5d/57/5d577bb2074b3e6c3359dfd6.jpg" },
            { id: 3, categoryId: 1, name: "Товар 3", price: 30.00, discount: 5.00, url: "https://outmaxshop.com/components/com_jshopping/files/img_products/15887/adidas-yeezy-451-15887-1.jpg" },
            { id: 4, categoryId: 2, name: "Товар 4", price: 40.00, discount: 20.00, url: "http://gd2.alicdn.com/bao/uploaded/i2/1749784378/TB2bWSojXXXXXb7XpXXXXXXXXXX_!!1749784378.jpg" },
            { id: 5, categoryId: 3, name: "Товар 5", price: 50.00, discount: 0.00, url: "https://ae04.alicdn.com/kf/H9602b439900e40b29d8aff221fa1c643y.jpg" }
        ]

    let getCategoryById = (id) =>  {
        const category = categories.find(item => item.id === id);
        return category ? category.name : "Категория не найдена";
    }

    let getRateById = (name) =>  {
        const curr = currency.find(item => item.name === name);
        return curr.rate ? curr.rate : 1.0;
    }

    const options = categories.map(category => {
		return <option key={category.id}>{category.name}</option>;
	}
    );

    const currencyOptions = currency.map(currency => {
		return <option key={currency.id}>{currency.name}</option>;
	}
    );

    return (
        <div className="home">
            <div className="filter">
                <select className="select-category" value={currencyValue} onChange = {(event) => setCurrencyValue(event.target.value)}>
			        {currencyOptions}
		        </select>
                <input type="text" className="search" placeholder="Search..." onChange={(event) => setName(event.target.value)} />
                <select className="select-category" value={value} onChange = {(event) => setValue(event.target.value)}>
                    <option key={0}>Все категории</option>
			        {options}
		        </select>
            </div>
            <div className="product-list">
                {products.map(product => {
                    if(value === "Все категории" || value === getCategoryById(product.categoryId)){
                        if(name === "" || product.name.toLowerCase().includes(name.toLowerCase())){
                            return(
                                <div key={product.id} className="product-card" onClick={(e) => {
                                    navigate(PRODUCT_ROUTE + "/" + product.id)
                                }}>
                                    <div className="product-image">
                                        <img src={product.url} alt="" />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-title">{product.name}</h3>
                                        <p className="product-price">{product.price * getRateById(currencyValue)} {currencyValue}</p>
                                        <div className="prod-buttons">
                                            <button className="add-to-cart" onClick={
                                                (e)=>{e.stopPropagation()}
                                                }>B корзину</button>
                                            <img id={product.id} className="like" src={liked.includes(product.id) ? likedUrl : unLikedUrl} alt="" onClick={e => {
                                                
                                            }}/>
                                        </div>
                                        
                                    </div>
                                </div>
                            );
                        }
                        
                    }
                    
                })}
            </div>
        </div>
        
    );
  })

export default Home