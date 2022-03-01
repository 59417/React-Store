import React from 'react';
import { toast } from 'react-toastify';
import axios from 'commons/axios';

class EditInventory extends React.Component {

    state = {
        id: '',
        name: '',
        price: 0,
        tags: '',
        image: '',
        status: 'available' 
    };

    componentDidMount() {
        const { id, name, price, tags, image, status } = this.props.product;
        this.setState({
            id,     // id: id, (名稱同可省略)
            name,
            price,
            tags,
            image,
            status
        });
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
            axios.put(`products/${this.state.id}`, product).then(response => {  // put方法更新數據 (路徑,數據)
                console.log(response.data);
                this.props.close(response.data);  // 提交完表單要關閉panel > close() 傳遞參數給 Products.js
                // alert('submit success!');  // 提交成功警示
                toast.success('Edit success!')
            });
        } else {
            toast.warning('Unfinished!')
        };
    };

    onDelete = () => {
        axios.delete(`products/${this.state.id}`).then(response => {  // delete方法刪除數據 (路徑)
            this.props.deleteProduct(this.state.id);
            this.props.close();  // 刪除完要關閉panel > close() 傳遞空值給 Products.js
            toast.success('Delete success!')
        });
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
                                className="button is-danger" 
                                type="button"
                                onClick={this.onDelete}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="control">
                            <button 
                                className="button" 
                                type="button" 
                                onClick={() => {this.props.close()}}
                            >Cancel</button>
                        </div>
                    </div>
                </form>
            </div> 
        )
    }
};
// button 放在 <form> 裡沒有 type 的話默認為提交表單

export default EditInventory;