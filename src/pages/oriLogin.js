import React from 'react';
import { useNavigate } from 'react-router-dom';  


function Login() {

    let navigate= useNavigate();
    return (
        <div className="login-wrapper">
            <form className="box login-box">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="text" 
                            placeholder="Email" 
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            className="input" 
                            type="password" 
                            placeholder="Password" 
                        />
                    </div>
                </div>
                <div className="control">
                    <button 
                        className="button is-fullwidth is-primary" 
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Login</button>
                </div>
            </form>
        </div>  
    );
}

export default Login;



