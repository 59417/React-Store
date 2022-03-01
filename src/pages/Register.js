import React from 'react';
import axios from 'commons/axios';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';  


export default function Register(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const handleRegister = async (data) => {
        try {
            const { nickname, email, password } = data;  // 解構出 data 裡的數據
            const response = await axios.post('/auth/register', { 
                nickname, 
                email, 
                password, 
                type: 0 
            });  // 用戶type設為0
            const jwtToken = response.data;  // response 回傳 JWT-token
            console.log(jwtToken);
            global.auth.setToken(jwtToken);  // 調用 /auth.js 定義的 setToken 函式
            toast.success(({data}) => `Hello ${data}!`, {
                data: nickname
              });
            navigate("/");  // 跳轉到首頁視圖
        } catch (error) {
            const message = error.response.data.message;
            toast.error(message);  // 顯示錯誤訊息
        };
    };

    console.log(errors);

    return (
        <div className="login-wrapper">

            <form className="box login-box" onSubmit={handleSubmit(handleRegister)}>
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.nickname && 'is-danger'}`}
                            type="text" 
                            placeholder="Nickname" 
                            name="nickname"
                            {...register("nickname", { 
                                required: 'nickname is required',
                                pattern: {
                                    value: /^[A-Za-z0-9]{2,20}$/,
                                    message: 'At less 6 digits!'
                                } 
                            })}
                        />
                        {errors.nickname && (
                            <p className="helper has-text-danger">{errors.nickname.message}</p>
                        )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.email && 'is-danger'}`}
                            type="text" 
                            placeholder="Email" 
                            name="email"
                            {...register("email", { 
                                required: 'email is required',
                                pattern: {
                                    value: /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                                    message: 'Invalid email'
                                } 
                            })}
                        />
                        {errors.email && (
                            <p className="helper has-text-danger">{errors.email.message}</p>
                        )}
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            className={`input ${errors.password && 'is-danger'}`}
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            {...register("password", {
                                required: 'password is required',
                                minLength: {
                                    value: 6,
                                    message: 'At less 6 digits!'
                                } 
                            })}
                        />
                        {errors.password && (
                            <p className="helper has-text-danger">{errors.password.message}</p>
                        )}
                    </div>
                </div>
                <div className="control">
                    <button className="button is-fullwidth is-primary">Submit</button>
                </div>
                <Link to="/login">
                    <br/>
                    <p className="is-size-7 is-underlined has-text-weight-bold">
                        Already had an account?&emsp;&gt;&gt;&gt; Login
                    </p>
                </Link>
            </form>

        </div>  
    )
};


