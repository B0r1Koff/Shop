import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../http/productAPI"
import axios from "axios"

const Home1 = () => {

    const itemsPerPage = 1

    const [productsArr, setProducts] = useState([])
    const [filteredProductsArr, setFilteredProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [exchangeRates, setExchangeRates] = useState({});
    const [baseCurrency, setBaseCurrency] = useState('BYN');
    const [liked, setLiked] = useState([])
    const [categoryValue, setCategoryValue] = useState('Все категории');
    const [name, setName] = useState('')
    const [currencyValue, setCurrencyValue] = useState('BYN')
    const [currentPage, setCurrentPage] = useState(1);

    const productQuery = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts
    })

    const currencyQuery = useQuery({
        queryKey: ["currency"],
        queryFn: async () => axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`), 
    })

    useEffect(() => {
        if(!productQuery.isPending){
            setProducts(productQuery.data)
            setFilteredProducts(productQuery.data)
        }
    }, [productQuery.data])

    useEffect(() => {
        if(!currencyQuery.isPending)
            setExchangeRates(currencyQuery.data.data.rates)
    }, [currencyQuery.data])

    useEffect(() => {
        setFilteredProducts(filteredProductsArr.filter((value) => {name.toLowerCase().includes("Ноутбуки")}))
        console.log(filteredProductsArr);
    }, [categories, name])

    return (
        <></>
    )
}

export default Home1