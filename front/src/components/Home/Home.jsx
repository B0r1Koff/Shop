import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import './Home.css'
import { observer } from "mobx-react-lite";
import { getAllProducts, getProductByCategoryId } from "../../http/productAPI";
import { getAllCategories } from "../../http/categoriesAPI";
import { getByUserId } from "../../http/favouritesAPI";
import ProductCard from "../ProductCard.jsx/ProductCard";

const Home = observer(({user, cart}) => {
    const itemsPerPage = 1

    const [productsArr, setProducts] = useState([])
    const [filteredProductsArr, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [exchangeRates, setExchangeRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('BYN');
    const [liked, setLiked] = useState([])
    const [value, setValue] = useState('Все категории');
    const [name, setName] = useState('')
    const [currencyValue, setCurrencyValue] = useState('BYN')
    const [currentPage, setCurrentPage] = useState(1);
  
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
           getAllProducts().then(function(val){
            setProducts(val.data)
            setFilteredProducts(val.data)
        })
        }, 10)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
           getAllCategories().then(function(val){setCategories(val.data)
         })
        }, 10)  
    }, [])

    useEffect(() => {
        setTimeout(() => {
           getByUserId(user.id).then(function(val){setLiked(val.data)
         })
        }, 10)  
    }, [user.id])

    const currency = [{id: 1, name: "BYN", rate: exchangeRates.BYN}, {id: 2, name: "RUB", rate: exchangeRates.RUB}, {id: 3, name: "USD", rate: exchangeRates.USD}, {id: 4, name: "EUR", rate: exchangeRates.EUR}]

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

    const handleClick = (page) => {
        setCurrentPage(page);
    };

    const renderData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProductsArr.slice(start, end).map(product => {
            
                    return(

                        <ProductCard 
                            key={product.id}
                            product={product}
                            getRateById={getRateById}
                            getImg={getImg}
                            currencyValue={currencyValue}
                            liked={liked}
                            userId={user.id}
                            cart={cart}
                            setLiked={setLiked}
                            user = {user}
                        />

                    );
            
        });
      };
    
      const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredProductsArr.length / itemsPerPage); i++) {
          pageNumbers.push(
            <span
              key={i}
              onClick={() => handleClick(i)}
              style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === i ? 'bold' : 'normal' }}
            >
              {i}
            </span>
          );
        }
    
        return pageNumbers;
      };

    return (
        <div className="home">
            <div className="filter">
                <select className="select-category" value={currencyValue} onChange = {(event) => setCurrencyValue(event.target.value)}>
			        {currencyOptions}
		        </select>
                <input type="text" className="search" placeholder="Search..." onChange={async(event) => {
                    setName(event.target.value)
                    let items = []
                    items = filteredProductsArr.filter((item) =>
                        item.name.toLowerCase().includes(event.target.value.toLowerCase())
                    )
                    setFilteredProducts(items)
                    if (event.target.value === "") {
                        if (value === "Все категории") {
                            setFilteredProducts(productsArr)
                        }else{
                            const category = categories.find(category => category.name === value)
                            const responce = await getProductByCategoryId(category.id)
                            setFilteredProducts(responce.data)
                        }
                    }
                    }} />
                <select className="select-category" value={value} onChange = {async (event) => {
                    setValue(event.target.value)
                    if(event.target.value != "Все категории"){
                        const category = categories.find(category => category.name === event.target.value)
                        const responce = await getProductByCategoryId(category.id)
                        setFilteredProducts(responce.data)
                    }else{
                        setFilteredProducts(productsArr)
                    }
                    if(name !== ""){
                        let items = []
                        items = filteredProductsArr.filter((item) =>
                        item.name.toLowerCase().includes(name.toLowerCase())
                    )
                    setFilteredProducts(items)
                    }
                    }}>
                    <option key={0}>Все категории</option>
			        {options}
		        </select>
            </div>

            <div className="product-list">
                {renderData()}
            </div>
                <div style={{ marginTop: '10px', display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {renderPageNumbers()}
                </div>
        </div>
        
    );
  })

export default Home