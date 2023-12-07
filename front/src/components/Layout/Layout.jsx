import {Link, Outlet} from "react-router-dom"
import "./Layout.css"
import { ADMIN_ROUTE, CART_ROUTE, ORDERS_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";

const Layout = ({role, cart}) => {

    return(
        <>
        {
            role === "user" ?
            <header>
                <Link className="h-link-auth" to={SHOP_ROUTE}><p className="text">Магазин</p></Link>
                <Link className="h-link-auth" to={CART_ROUTE}><p className="text">Корзина</p></Link>
                <Link className="h-link-auth" to={PROFILE_ROUTE}><p className="text">Профиль</p></Link>
                <Link className="h-link-auth" to={REGISTRATION_ROUTE} onClick={(e) => {cart.clearCart()}}><p className="text">Выход</p></Link>
            </header>
            : role === "admin" ?
            <header>
                <Link className="h-link" to={ADMIN_ROUTE}><p className="text">Админ панель</p></Link>
                <Link className="h-link" to={ORDERS_ROUTE}><p className="text">Заказы</p></Link>
                <Link className="h-link" to={PROFILE_ROUTE}><p className="text">Профиль</p></Link>
                <Link className="h-link" to={REGISTRATION_ROUTE}><p className="text">Выход</p></Link>
            </header>
            :
            <header>
                <Link className="h-link" to={SHOP_ROUTE}><p className="text">Магазин</p></Link>
                <Link className="h-link" to={REGISTRATION_ROUTE}><p className="text">Авторизация</p></Link>
            </header>
        }
        <Outlet/>
        </>
    );
}

export default Layout