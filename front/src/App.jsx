import { useContext, useEffect } from 'react'
import Home from './components/Home/Home'
import Home1 from './components/Home/Home1'
import Registration from './components/Authorization/Authorization'
import Authorization from './components/Registration/Registration'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import {Route, Routes } from 'react-router-dom';
import './App.css'
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, CART_ROUTE, ORDERS_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts'
import Profile from './components/Profile/Profile'
import Orders from './components/Orders/Orders'
import { observer } from 'mobx-react-lite'
import Product from './components/Product/Product'
import UserStore from './store/userStore'
import { toJS } from 'mobx'
import CartStore from './store/cartStore'
import AdminPanel from './components/Admin/AdminPanel'

const user = new UserStore()
const cart = new CartStore()

const App = observer(() =>  {
  
  useEffect(() => {
    const raw = localStorage.getItem('loggedUser') || false
    user.setUser(JSON.parse(raw))
  }, [])
  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(toJS(user.user)))
  }, [toJS(user.user)])
  useEffect(() => {
    cart.loadCartFromLocalStorage()
  }, [])
  
  return (
      <div>

        {
          user.user &&
          <Routes>
            <Route path={REGISTRATION_ROUTE}element={<Registration user={user}/>}></Route>
            <Route path={AUTHORIZATION_ROUTE} element={<Authorization user={user}/>}></Route>
            <Route path={SHOP_ROUTE} element={<Layout role = {user.user.role} cart = {cart}/>}>
              <Route path={CART_ROUTE} element={<Cart user = {user.user} cart = {cart}/>}></Route>
              <Route path={PROFILE_ROUTE} element={<Profile user = {user.user}/>}></Route>
              <Route path={ADMIN_ROUTE} element={<AdminPanel/>}></Route>
              <Route path={ORDERS_ROUTE} element={<Orders user = {user.user}/>}></Route>
              <Route path={SHOP_ROUTE} element={<Home user = {user.user} cart = {cart}/>}></Route>
              <Route path={PRODUCT_ROUTE + "/:id"} element={<Product user = {user.user}/>}></Route>
            </Route>
          </Routes>
        }

        {
          !user.user &&
          <Routes>
            <Route path={REGISTRATION_ROUTE}element={<Registration user={user}/>}></Route>
            <Route path={AUTHORIZATION_ROUTE} element={<Authorization user={user}/>}></Route>
            <Route path={SHOP_ROUTE} element={<Layout role={user.user.role}/>}>
              <Route path={SHOP_ROUTE} element={<Home user = {user.user}/>}></Route>
              <Route path={PRODUCT_ROUTE + "/:id"} element={<Product/>}></Route>
            </Route>
          </Routes>
        }
        
      </div>
  )
})

export default App
