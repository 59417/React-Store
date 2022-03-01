import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'commons/axios';
import Layout from 'pages/Layout';
import CartItem from 'components/CartItem';
import { formatPrice } from 'commons/helper';


const Cart = () => {

    const [carts, setCarts] = useState([]);  // 相當於 class 中定義 state = {carts: []}
    
    useEffect(() => {  // 相當於 class 中執行 render (第一次渲染 or 更新渲染)
        const user = global.auth.getUser() || {};  // 取得 user.json 中當前登入 user 資訊
        axios.get(`/carts?userId=${user.email}`)  // 透過 userId 控制訪問權限
            .then(res => setCarts(res.data))  
    }, []);  // 根據第二個參數重新渲染 > 不給定數組: 無限重複渲染, []: 相當於第一次渲染 (componentDidMount)

    const totalPrice = useMemo(() => {
            const total = carts
                .map(cart => cart.mount * parseInt(cart.price))
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            return formatPrice(total);
    }, [carts]);  // 當 carts 變化時才執行 totalPrice

    const updateCart = (cart) => {  // cart: 傳入 CartItem 修改數量的購物車商品
        const newCarts = [...carts];  // 先複製原本的 carts
        const _index = newCarts.findIndex(c => c.id === cart.id);  // 找到修改數量商品的 id
        newCarts.splice(_index, 1, cart);  // 刪掉 _index 的數據更新為 cart
        setCarts(newCarts);  // 設置 state
    };

    const deleteCart = (cart) => {  // cart: 傳入 CartItem 被刪除的購物車商品
        const _carts = carts.filter(c => c.id !== cart.id);  // 留下沒匹配到的元素
        setCarts(_carts);  // 設置 state
    };
    
    const navigate = useNavigate();
    

    return (
        <Layout>
            <div className="cart-page">
                <span className="cart-title">Shopping Cart</span>
                <div className="cart-list">
                    <TransitionGroup component={null}>
                        {
                            carts.map(cart => (
                                <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>
                                    <CartItem 
                                        key={cart.id} 
                                        cart={cart} 
                                        updateCart={updateCart} 
                                        deleteCart={deleteCart}
                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                </div>
                {carts.length === 0 ? <p className="no-cart">NO GOODS</p> : ''}
                <div className="cart-total">
                    <br/>
                    <button 
                        className="button is-info is-light is-outlined level-left" 
                        type="button"
                        onClick={() => {navigate("/")}}
                    >
                        Return
                    </button>
                    <span>Total: 
                        <span className="total-price">{totalPrice}</span>
                    </span>
                </div>
            </div>
        </Layout>
    )
};
// 條件判斷式: condition ? exprIfTrue : exprIfFalse
// condition === (truthy, falsy) >>> (執行 exprIfTrue, 執行 exprIfFalse) 

export default Cart;