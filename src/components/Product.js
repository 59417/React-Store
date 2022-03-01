import React from 'react';
import axios from 'commons/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Panel from 'components/Panel';
import { formatPrice } from 'commons/helper';
import EditInventory from 'components/EditInventory';

export const withNavigation = (Component) => {
    return props =>
        <Component {...props} navigate={useNavigate()} />;
};

class Product extends React.Component {
    
    // formatPrice = dollars => {
    //     return dollars.toLocaleString('zh-TW', {
    //         style:'currency',
    //         currency: 'TWD'
    //     });
    // };

    toEdit = () => {
        Panel.open({
            component: EditInventory,  // 打開編輯panel
            props: {
                product: this.props.product,  // 參數傳遞給 EditInventory
                deleteProduct: this.props.delete
            },
            callback: (data) => {
                if (data) {
                    this.props.update(data);
                    console.log(data);
                };
            }
        });
    };

    addCart = async () => {
        if (!global.auth.isLogin()) {
            this.props.navigate('/login');
            toast.info('Please login first!');
            return;  // 直接跳出(下方不執行)
        };
        try {
            const user = global.auth.getUser() || {};  // 取得 user.json 中當前登入 user 資訊
            const { id, name, price, image } = this.props.product;  // 按addCart鈕後須取得的數據
            
            const res = await axios.get(`/carts?productId=${id}&&userId=${user.email}`);
            const carts = res.data;
            
            if (carts && carts.length > 0) {  // 商品已存在購物車中
                const cart = carts[0];
                cart.mount += 1;
                await axios.put(`/carts/${cart.id}`, cart);
                console.log(cart);
                toast.success('Add more success!');
            } else {  // 購物車中尚無此商品
                const cart = {
                    productId: id,
                    name,
                    price,
                    image,
                    mount: 1,  // 商品在購物車裡的數量 (默認為1)
                    userId: user.email
                };
                await axios.post('/carts', cart).then(res => {
                    console.log(res.data);
                    toast.success('Add cart success!');
                });
            };
            this.props.updateCartNum();
        } catch (err) {
            toast.error('Add cart failed QQ');
        };
    };

    renderManagerBtn = () => {
        const user = global.auth.getUser() || {};  // 未登入回傳空 {}
        if (user.type === 1) {  // 回傳 商品編輯鈕 html
            return (
                <div className="p-head has-text-right" onClick={this.toEdit}>
                    <span className="icon edit-btn">
                        <i className="fas fa-sliders-h"></i>
                    </span>
                </div>
            );
        };
    };

    render() { 

        const { name, image, tags, price, status } = this.props.product;

        const _pClass = {
            available: 'product',
            unavailable: 'product out-stock'
        };

        return (
            <div className={_pClass[status]}>
                <div className="p-content">
                    {this.renderManagerBtn()}
                    <div className="img-wrapper">
                        <div className="out-stock-text">Out of Stock</div>
                        <figure className="image is-4by3">
                            <img src={image} alt={name} />
                        </figure>
                    </div>
                    <p className="p-tags">{tags}</p>
                    <p className="p-name">{name}</p>
                </div>
                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    <button 
                        className="add-cart" 
                        disabled={status === 'unavailable'}
                        onClick={this.addCart}
                    >
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        );
    }
};

export default withNavigation(Product);