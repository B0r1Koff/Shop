import Admin from "./components/Admin/Admin"
import Authorization from "./components/Authorization/Authorization"
import Cart from "./components/Cart/Cart"
import Home from "./components/Home/Home"
import Orders from "./components/Orders/Orders"
import Product from "./components/Product/Product"
import Profile from "./components/Profile/Profile"
import Registartion from "./components/Registration/Registration"
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, CART_ROUTE, ORDERS_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Home
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Authorization
    },
    {
        path: AUTHORIZATION_ROUTE,
        Component: Registartion
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: Product
    },
]