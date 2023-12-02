import React from "react";
import './Registration.css'
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";

const Registartion = ({user}) => {
    const navigate = useNavigate()

    return(
        <div className="container">
            <div className="box">
                <h3 className="h3"><span className="span"></span>Авторизация</h3>

                <div className="form">

                    <div className="input_box">
                        <input type="text" required className="input"/>
                        <label className="label">Email</label>
                    </div>
                    <div className="input_box">
                        <input type="text" required className="input"/>
                        <label className="label">Пароль</label>
                    </div>

                    <button type="submit" className="login-button" onClick={(e) => {
                        localStorage.setItem('loggedUser', JSON.stringify({"login":"aaa","password":"bbb","role":"admin"}))
                        user.setUser({login:"aaa", password: "bbb", role:"admin"})
                        navigate(ADMIN_ROUTE)
                    }}>Авторизоваться</button>

                    <p className="signup_link">Нет аккаунта ? <Link to={AUTHORIZATION_ROUTE} className="a">Зарегистрироваться</Link></p>

                </div>
             
            </div>

        </div>
    );
}

export default Registartion