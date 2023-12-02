import React from "react";
import "./Authorization.css"
import { Link, useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";

const Authorization = ({user}) => {
    const navigate = useNavigate()

    return(
        <div className="container">
        <div className="box">
            <h3 className="h3"><span className="span"></span>Регистрация</h3>
            <div className="form">

                <div className="input_box">
                    <input type="text" required className="input"/>
                    <label className="label">Email</label>
                </div>
                <div className="input_box">
                    <input type="text" required className="input"/>
                    <label className="label">Пароль</label>
                </div>
                <div className="input_box">
                    <input type="text" required className="input"/>
                    <label className="label">Повторите пароль</label>
                </div>

                <button type="submit" className="create-account-button" onClick={(e) => {
                    localStorage.setItem('loggedUser', JSON.stringify({"login":"ccc","password":"ddd","role":"user"}))
                    user.setUser({login:"ccc", password: "ddd", role:"user"})
                    navigate(SHOP_ROUTE)
                }}>Создать аккаунт</button>
                <p className="login_link">Уже есть аккаунт ? <Link to={REGISTRATION_ROUTE} className="a">Войти</Link></p>

            </div>
        </div>
    </div>

    );
}

export default Authorization