import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Panel from 'components/Panel';
import UserProfile from 'components/UserProfile';

const Header = (props) => {

    const navigate = useNavigate();
    
    const toProfile = () => {
        Panel.open({
            component: UserProfile,
            props: {
                user: props.user
            },
            callback: (data) => {
                console.log(data);
                if (data === 'logout') {  // UserProfile 中定義 logout 執行時會傳送字串 'logout'
                    navigate(0);  // 重刷新當前頁面 (-1 為 goBack)
                }
            }
        });
    };

    return (
        <div className="header">
            <div className="grid">
                <div className="start">
                    <Link to="/">Home</Link>
                </div>
                <div className="end">
                    {props.user.nickname ? (
                        <span className="nickname" onClick={toProfile}>
                            <i className="far fa-user"></i>
                            {props.user.nickname}
                        </span>
                    ) : (
                        <React.Fragment>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Header;
