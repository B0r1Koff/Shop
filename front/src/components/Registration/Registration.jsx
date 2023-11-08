import React from "react";
import './Registration.css'
import { Link, useNavigate } from "react-router-dom";

const Registartion = () => {
    const navigate = useNavigate()

    return(
        <div className="container">
            <div className="box">
                <h3 className="h3"><span className="span"></span>Login</h3>

                <div className="form">

                    <div className="input_box">
                        <input type="text" required className="input"/>
                        <label className="label">Username</label>
                    </div>
                    <div className="input_box">
                        <input type="text" required className="input"/>
                        <label className="label">Password</label>
                    </div>

                    <button type="submit" className="login-button" onClick={(e) => {
                        navigate("/home")
                    }}>Login</button>

                    <p className="signup_link">Don't have an account ? <Link to={"/authorization"} className="a">Signup</Link></p>

                </div>
             
            </div>

        </div>
    );
}

export default Registartion