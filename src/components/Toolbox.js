import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const withNavigation = (Component) => {
    return props =>
        <Component {...props} navigate={useNavigate()} />;
};


class Toolbox extends React.Component {

    state = {
        searchText: ''
    };

    handleChange = (event) => {
        const value = event.target.value;  // .target 為獲取本身
        this.setState({
            searchText: value
        });
        this.props.search(value);
    };

    clearSearchText = () => {
        this.setState({
            searchText: ''
        });
        this.props.search('');
    };

    goCart = () => {
        if (!global.auth.isLogin()) {
            this.props.navigate('/login');
            toast.info('Please login first!');
            return;  // 直接跳出(下方不執行)
        };
        this.props.navigate('/cart');
    };

    render() {
        return (
            <div className="tool-box">
                <div className="logo-text">Store</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                                type="text" 
                                className="input search-input" 
                                placeholder="Search Product" 
                                value={this.state.searchText}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="control">
                            <button className="button" onClick={this.clearSearchText}>
                                X
                            </button>
                        </div>
                    </div>
                </div>
                <div className="cart-box" onClick={this.goCart}>
                    <i className="fas fa-shopping-cart"></i> 
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
            </div>
        );
    }
}
// <i className="fas fa-shopping-cart"></i> 購物車圖標
// 購物車數量"cart-num"由父組件Products取得 ({this.props.cartNum})

export default withNavigation(Toolbox);