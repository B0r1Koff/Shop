import React from "react";
import "./Authorization.css"
import { Link, useNavigate } from "react-router-dom";

const Authorization = () => {
    const navigate = useNavigate()

    return(
        <div className="container">
        <div className="box">
            <h3 className="h3"><span className="span"></span>Signup</h3>
            <div className="form">

                <div className="input_box">
                    <input type="text" required className="input"/>
                    <label className="label">Username</label>
                </div>
                <div className="input_box">
                    <input type="text" required className="input"/>
                    <label className="label">Email Id</label>
                </div>
                <div className="input_box">
                    <input type="text" required className="input"/>
                    <label className="label">Create password</label>
                </div>

                <button type="submit" className="create-account-button" onClick={(e) => {
                    navigate("/home")
                }}>Create Account</button>
                <p className="login_link">Already have an account ? <Link to={"/registration"} className="a">Login</Link></p>

            </div>
        </div>
    </div>

    );
}

export default Authorization