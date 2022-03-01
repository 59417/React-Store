import React, { useState, useMemo } from 'react';
import axios from 'commons/axios';
import { formatPrice } from 'commons/helper';


const CartItem = (props) => {

    const { id, name, price, image } = props.cart || {};
    const [mount, setMount] = useState(props.cart.mount);

    const sumPrice = useMemo(() => {
        return formatPrice(mount * parseInt(price));  // 要執行的回調函式
    }, [mount, price]);  // 當 mount, price 變化時才執行 sumPrice

    const handleChange = (event) => {
        const _mount = parseInt(event.target.value);
        setMount(_mount);
        const newCart = {
            ...props.cart,  // 解構原來的cart
            mount: _mount  // mount有發生變化 > 重新定義為 _mount
        };
        axios.put(`/carts/${id}`, newCart).then(res => {
            console.log(res.data);
            props.updateCart(newCart);
        });
    };

    const deleteCart = () => {
        axios.delete(`/carts/${id}`).then(res => {
            console.log('Delete Cart Success!');
            props.deleteCart(props.cart);
        });
    };

    return (
        <div className="columns is-vcentered">
            <div className="column is-narrow" onClick={deleteCart}>
                <span className="close">X</span>
            </div>
            <div className="column is-narrow">
                <img src={image} alt="" width="100" />
            </div>
            <div className="column cart-name is-narrow">{name}</div>
            <div className="column">
                <span className="price">{formatPrice(price)}</span>
            </div>
            <div className="column">
                <input 
                    className="input num-input" 
                    type="number" 
                    min={1}
                    value={mount} 
                    onChange={handleChange} 
                />
            </div>
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    )
};

export default CartItem;