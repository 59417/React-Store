import React from 'react';
import { useNavigate } from 'react-router-dom';  


export const withNavigation = (Component) => {
    return props =>
        <Component {...props} navigate={useNavigate()} />;
};



class ClassLogin extends React.Component {

    state = {
        email: '',
        password: ''
    };


    handleSubmit = event => {
        // 1. 阻止默認行為 (頁面提交)
        event.preventDefault();
        // 2. 獲取表單數據
        console.log(this.state);
        // 3. 處理登錄邏輯
        // 4. 跳轉至首頁視圖
        this.props.navigate('/');
    };


    handleChange = event => {
        console.log(event.target.value);
        console.log(event.target.name);
        this.setState({
            [event.target.name]: event.target.value
            // [ 動態賦值 ]
        })
    }


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
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
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
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
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

export default withNavigation(ClassLogin);



