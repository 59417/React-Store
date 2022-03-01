import React from 'react';
import { useNavigate } from 'react-router-dom';  


export const withNavigation = (Component) => {
    return props =>
        <Component {...props} navigate={useNavigate()} />;
};



class Login extends React.Component {

    emailRef = React.createRef();  
    passwordRef = React.createRef();
    // 非受控組件寫法

    handleSubmit = event => {
        // 1. 阻止默認行為 (頁面提交)
        event.preventDefault();
        // 2. 獲取表單數據
        const formData = {
            email: this.emailRef.current.value,  // 非受控組件寫法
            password: this.passwordRef.current.value  // 非受控組件寫法
        };
        console.log(formData);
        // 3. 處理登錄邏輯
        // 4. 跳轉至首頁視圖
        this.props.navigate('/');
    };


    render() {
        return (
            <div className="login-wrapper">

                <form className="box login-box" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                className="input" 
                                type="text" 
                                placeholder="Email" 
                                ref={this.emailRef}  // 非受控組件寫法
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
                                ref={this.passwordRef}  // 非受控組件寫法
                            />
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-fullwidth is-primary">Login</button>
                    </div>
                </form>
            </div>  
        );
    }
}

export default withNavigation(Login);



