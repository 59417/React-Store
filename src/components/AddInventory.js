import React from 'react';
import { toast } from 'react-toastify';
import axios from 'commons/axios';

class AddInventory extends React.Component {

    state = {
        name: '',
        price: 0,
        tags: '',
        image: '',
        status: 'available'
    };

    handleChange = (event) => {
        const value = event.target.value;  // 定義 value 變數 為 event本身(.target)的值(.value)
        const name = event.target.name;  // 定義 name 變數 為 event本身(.target)的名稱(.name)
        this.setState({
            [name]: value  // [ 動態獲取參數 ]
        });
    };

    submit = (event) => {
        event.preventDefault();  // 避免默認提交自己
        const product = { ...this.state };  // 獲取 this.state 的所有變數
        if (product.image && product.name && product.price !== 0) {
            axios.post('products', product).then(response => {  // 使用 post 方法把數據放到 products 裡
                console.log(response.data);
                this.props.close(response.data);  // 提交完表單要關閉panel > close() 傳遞參數給 Products.js
                // alert('submit success!');  // 提交成功警示
                toast.success('Submit success!')
            });
        } else {
            toast.warning('Unfinished!')
        };
    };

    render() {
        return (
            <div className="inevntory">
                <p className="title has-text-centered">Inventory</p>

                <form onSubmit={this.submit}>
                    <div className="field">
                        <div className="control">
                        <label className="label has-text-left">Name</label>
                            <textarea 
                                className="textarea" 
                                name="name" 
                                value={this.state.name} 
                                onChange={this.handleChange} 
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                        <label className="label has-text-left">Price</label>
                            <input 
                                className="input" 
                                type="number" 
                                name="price" 
                                value={this.state.price} 
                                onChange={this.handleChange} 
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                        <label className="label has-text-left">Tags</label>
                            <input 
                                className="input" 
                                type="text" 
                                name="tags" 
                                value={this.state.tags} 
                                onChange={this.handleChange} 
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                        <label className="label has-text-left">Image</label>
                            <input 
                                className="input" 
                                type="text" 
                                name="image" 
                                value={this.state.image} 
                                onChange={this.handleChange} 
                            />
                        </div>
                    </div>

                    <div className="field">
                        <div className="control">
                        <label className="label has-text-left">Status</label>
                            <div className="select is-fullwidth">
                            <select 
                                name="status" 
                                value={this.state.status} 
                                onChange={this.handleChange}
                            >
                                <option>available</option>
                                <option>unavailable</option>
                            </select>
                            </div>
                        </div>
                    </div>

                    <br/>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                            <button 
                                className="button" 
                                type="button" 
                                onClick={() => {this.props.close()}}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div> 
        )
    }
};
// button 放在 <form> 裡沒有 type 的話默認為提交表單

export default AddInventory;