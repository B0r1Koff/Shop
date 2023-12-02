import { useContext, useEffect } from 'react'
import Home from './components/Home/Home'
import Registration from './components/Registration/Registration'
import Authorization from './components/Authorization/Authorization'
import Cart from './components/Cart/Cart'
import Layout from './components/Layout/Layout'
import {Route, Routes } from 'react-router-dom';
import './App.css'
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, CART_ROUTE, ORDERS_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/consts'
import Profile from './components/Profile/Profile'
import Admin from './components/Admin/Admin'
import Orders from './components/Orders/Orders'
import { observer } from 'mobx-react-lite'
import Product from './components/Product/Product'
import UserStore from './store/userStore'
import { toJS } from 'mobx'

const user = new UserStore()

const App = observer(() =>  {
  
  useEffect(() => {
    const raw = localStorage.getItem('loggedUser') || false
    try{
      user.setUser(JSON.parse(raw))
    }catch{
      console.log("parse error");
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(toJS(user.user)))
  }, [toJS(user.user)])
  
  return (
      <div>

        {
          user.user &&
          <Routes>
            <Route path={REGISTRATION_ROUTE}element={<Registration user={user}/>}></Route>
            <Route path={AUTHORIZATION_ROUTE} element={<Authorization user={user}/>}></Route>
            <Route path={SHOP_ROUTE} element={<Layout role={user.user.role}/>}>
              <Route path={CART_ROUTE} element={<Cart/>}></Route>
              <Route path={PROFILE_ROUTE} element={<Profile/>}></Route>
              <Route path={ADMIN_ROUTE} element={<Admin/>}></Route>
              <Route path={ORDERS_ROUTE} element={<Orders/>}></Route>
              <Route path={SHOP_ROUTE} element={<Home/>}></Route>
              <Route path={PRODUCT_ROUTE + "/:id"} element={<Product/>}></Route>
            </Route>
          </Routes>
        }

        {
          !user.user &&
          <Routes>
            <Route path={REGISTRATION_ROUTE}element={<Registration user={user}/>}></Route>
            <Route path={AUTHORIZATION_ROUTE} element={<Authorization user={user}/>}></Route>
            <Route path={SHOP_ROUTE} element={<Layout role={user.user.role}/>}>
              <Route path={SHOP_ROUTE} element={<Home/>}></Route>
              <Route path={PRODUCT_ROUTE + "/:id"} element={<Product/>}></Route>
            </Route>
          </Routes>
        }
        
      </div>
  )
})

export default App
