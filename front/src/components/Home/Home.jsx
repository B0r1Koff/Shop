import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import './Home.css'
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { PRODUCT_ROUTE } from "../../utils/consts";
import { getAllProducts } from "../../http/productAPI";
import { getAllCategories } from "../../http/categoriesAPI";

const Home = observer(() => {
    const [productsArr, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [exchangeRates, setExchangeRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('BYN');
  
    useEffect(() => {
      const fetchExchangeRates = async () => {
        try {
          const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
          const data = await response.json();
          setExchangeRates(data.rates);
        } catch (error) {
          console.error('Error fetching exchange rates:', error);
        }
      };
  
      fetchExchangeRates();
    }, [baseCurrency]);
    useEffect(() => {
        setTimeout(() => {
           getAllProducts().then(function(val){setProducts(val.data)
        })
        }, 10)  
    }, [])
    useEffect(() => {
        setTimeout(() => {
           getAllCategories().then(function(val){setCategories(val.data)
         })
        }, 10)  
    }, [])

    const [value, setValue] = useState('Все категории');
    const [name, setName] = useState('')
    const [currencyValue, setCurrencyValue] = useState('BYN')
    const [liked, setLiked] = useState([1, 2, 4])

    const currency = [{id: 1, name: "BYN", rate: exchangeRates.BYN}, {id: 2, name: "RUB", rate: exchangeRates.RUB}, {id: 3, name: "USD", rate: exchangeRates.USD}, {id: 4, name: "EUR", rate: exchangeRates.EUR}]
    const likedUrl = "public/images/liked.png"
    const unLikedUrl = "public/images/nliked.png"
    const navigate = useNavigate()

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

    const getImg = (image) => {
        return "data:image/jpeg;base64,"+image.body
    }

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
                {productsArr.map(product => {
                    if(value === "Все категории" || value === getCategoryById(product.category.id)){
                        if(name === "" || product.name.toLowerCase().includes(name.toLowerCase())){
                            return(
                                <div key={product.id} className="product-card" onClick={(e) => {
                                    navigate(PRODUCT_ROUTE + "/" + product.id)
                                }}>
                                    <div className="product-image">
                                        <img src={getImg(product.image)} alt="" />
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