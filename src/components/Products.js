import React from 'react';
import axios from 'commons/axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Toolbox from 'components/Toolbox';
import Product from 'components/Product';
import Panel from 'components/Panel';
import Inventory from 'components/AddInventory';

class Products extends React.Component {

    state = {
        products: [],
        sourceProducts: [],  // 用來過濾搜尋結果避免直接覆蓋
        cartNum: 0
    };

    componentDidMount() {
        axios.get('/products')
            .then(response => {
            console.log(response.data);
            this.setState({
                products: response.data,
                sourceProducts: response.data
            });
        });
        this.updateCartNum();
    };

    search = (text) => {
        console.log(text);
        
        // 1. get products array copy (_products)
        let _products = [...this.state.sourceProducts];
        
        // 2. filter copy
        _products = _products.filter(p => {
            const matchArray = p.name.match(new RegExp(text, 'gi'));  // g: 全域變數, i: 不分大小寫
            /* 'Abcd'.match(new RegExp('ab', 'gi'))
               ['Ab']
               'Abcd'.match(new RegExp('', 'gi'))
               (5) ['', '', '', '', '']
               'Abcd'.match(new RegExp('e', 'gi'))
                null */
            return !!matchArray;  // (!!matchArray) == (matchArray !== null)
        });

        // 3. change state (setState())
        this.setState({
            products: _products
        });
    };

    toAdd = () => {
        Panel.open({
            component: Inventory,  // 不直接寫 Panel.open(Inventory) > 還有其他參數需傳遞
            callback: data => {
                if (data) {  // 如果data不為空值 (!data)
                    this.add(data);
                    console.log('push new data: ', data);
                }; 
            }
        })
    };

    add = (product) => {
        const _products = [...this.state.products];
        const _sProducts = [...this.state.sourceProducts];
        _products.push(product);  // .push() 添加新元素
        _sProducts.push(product);

        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };

    update = (product) => {
        const _products = [...this.state.products];
        const _index = _products.findIndex(p => p.id === product.id);
        _products.splice(_index, 1, product);  // array.splice(刪除的元素起始索引, 向後刪除數量, 插入的新元素)
        const _sProducts = [...this.state.sourceProducts];
        const _sIndex = _sProducts.findIndex(p => p.id === product.id);
        _sProducts.splice(_sIndex, 1, product);  // 將index=product.id的元素更新為product

        this.setState({  // 更新為修改後的 _products, _sProducts
            products: _products,  
            sourceProducts: _sProducts
        });
    };

    delete = (id) => {
        const _products = this.state.products.filter(p => p.id !== id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
        console.log(_products);
        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };

    updateCartNum = async () => {
        const cartNum = await this.initCartNum();
        this.setState({
            cartNum: cartNum
        });
    };
    
    initCartNum = async () => {
        const user = global.auth.getUser() || {};  // 取得 user.json 中當前登入 user 資訊
        const res = await axios.get(`/carts`, {
            params: {  // URL 上要代的參數
                userId: user.email  // 根據參數設定 get 數據
            }
        });
        const carts = res.data;
        const cartNum = carts
        .map(cart => cart.mount)  // 返回每項商品 mount 的數組
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);  // 0為previousValue起始值
        return cartNum;
    };

    render() {
        return (
            <div>
                <Toolbox search={this.search} cartNum={this.state.cartNum}/>
                <div className="products">
                    <div className="columns is-multiline is-desktop">
                        <TransitionGroup component={null}>
                            {
                                this.state.products.map(p => {
                                    return (
                                        <CSSTransition 
                                            classNames="product-fade"
                                            timeout={{enter: 300, exit:300}}
                                            key={p.id}
                                        >
                                            <div className="column is-3" key={p.id}>
                                                <Product 
                                                    product={p} 
                                                    update={this.update}
                                                    delete={this.delete}
                                                    updateCartNum={this.updateCartNum}
                                                /> 
                                            </div>
                                        </CSSTransition>
                                    );
                                })
                            }
                        </TransitionGroup>
                    </div> 
                    {
                        (global.auth.getUser() || {}).type === 1 && (
                            <button className="button is-primary add-btn" onClick={this.toAdd}>
                                Add
                            </button>                   
                        )
                    }
                </div>
            </div>
        );
    }
};
// <TransitionGroup> 默認為 <div> (會影響原本佈局)
// (timeout={{enter: 300, exit:300}}) == (timeout={300})

export default Products;

/*
|| 與 && 在JS裡與其它語言不一樣，這是選擇器運算符，而非邏輯運算符。
對於||來說，若判斷為true，則返回第一個值，為false返回第二個值。
&& 相反，若判斷為 true,則返回第二個，為false為返回第一個值。
絕對不是像其它語言那樣返回true或false,而是會返回第一個值或第二個值。
 */
