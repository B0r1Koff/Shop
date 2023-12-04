import React, { useEffect } from "react";
import "./Registration.css"
import { Link, useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { useState } from "react";
import { checkLogin, registration } from "../../http/userAPI";
import { toJS } from 'mobx'
import { useQuery } from "@tanstack/react-query";

const Registartion = ({user}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confPass, setConfPAss] = useState('')

    return(
        <div className="container">
        <div className="box">
            <h3 className="h3"><span className="span"></span>Регистрация</h3>
            <div className="form">

                <div className="input_box">
                    <input type="text" required className="input" onChange={(e) => {setEmail(e.target.value)}}/>
                    <label className="label">Email</label>
                </div>
                <div className="input_box">
                    <input type="password" required className="input" onChange={(e) => {setPass(e.target.value)}}/>
                    <label className="label">Пароль</label>
                </div>
                <div className="input_box">
                    <input type="password" required className="input" onChange={(e) => {setConfPAss(e.target.value)}}/>
                    <label className="label">Повторите пароль</label>
                </div>

                <button type="submit" className="create-account-button" onClick={async(e) => {

                    if(email === "" || pass === "" || confPass === ""){
                        alert("Заполните все поля!")
                        e.preventDefault()
                        return
                    }
                    if(pass !== confPass){
                        alert("Пароли не совпадают!")
                        e.preventDefault()
                        return
                    }
                    if(pass.length < 4 || email.length < 4){
                        alert("Длина логина и пароля должна быть не менее 4 символов!")
                        e.preventDefault()
                        return
                    }

                    const check = await checkLogin(email)

                    if(check.data){
                        console.log(check.data);
                        alert("Такой пользователь уже зарегистрирован!")
                        e.preventDefault()
                        return
                    }else{
                        const response = await registration(email, pass)

                        localStorage.setItem('loggedUser', JSON.stringify(toJS(response.data)))
                        user.setUser(toJS(response.data))
                        navigate(SHOP_ROUTE)
                    }
                    
                }}>Создать аккаунт</button>
                <p className="login_link">Уже есть аккаунт ? <Link to={REGISTRATION_ROUTE} className="a">Войти</Link></p>

            </div>
        </div>
    </div>

    );
}

export default Registartion