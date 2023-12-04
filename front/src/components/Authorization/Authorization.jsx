import React from "react";
import './Authorization.css'
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, AUTHORIZATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { useState, useEffect } from "react";
import { toJS } from 'mobx'
import { checkLogin, getAllUsers } from "../../http/userAPI";

const Authorization = ({user}) => {
    
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return(
        <div className="container">
            <div className="box">
                <h3 className="h3"><span className="span"></span>Авторизация</h3>

                <div className="form">

                    <div className="input_box">
                        <input type="text" required className="input" onChange={(e) => {setEmail(e.target.value)}}/>
                        <label className="label">Email</label>
                    </div>
                    <div className="input_box">
                        <input type="password" required className="input" onChange={(e) => {setPass(e.target.value)}}/>
                        <label className="label">Пароль</label>
                    </div>

                    <button type="submit" className="login-button" onClick={async(e) => {

                        if(email === "" || pass === ""){
                            alert("Заполните все поля!")
                            e.preventDefault()
                            return
                        }

                        const check = await checkLogin(email)

                        if(check.data){
                            localStorage.setItem('loggedUser', JSON.stringify(toJS(check.data)))
                            user.setUser(toJS(check.data))
                            if(check.data.role === "user"){
                                navigate(SHOP_ROUTE)
                            }else{
                                navigate(ADMIN_ROUTE)
                            } 
                        }else{
                            alert("Пользователь не найден!")
                            e.preventDefault()
                            return
                        }

                    }}>Авторизоваться</button>

                    <p className="signup_link">Нет аккаунта ? <Link to={AUTHORIZATION_ROUTE} className="a">Зарегистрироваться</Link></p>

                </div>
             
            </div>

        </div>
    );
}

export default Authorization