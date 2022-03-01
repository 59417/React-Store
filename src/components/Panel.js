/* 彈出組件 (Products --open--> Panel): 
   A) 一次渲染隨需調用 (一般組件調用要重載再渲染)  
   B) 扮演裝載組件的外殼 (裡面可以放其他組件 ex. 表單)
    a. 子組件做為參數傳遞 (to Panel) 並被渲染
    b. 子組件可以關閉彈出層 (Panel)
    c. 子組件與調用者 (Products) 可以通訊
*/ 

import React from 'react';
import { render } from 'react-dom';  // 用 render 渲染成 instance

class Panel extends React.Component {

    state = {
        active: false,
        component: null,
        callback: () => {}
    };

    close = (data) => {
        this.setState({
            active: false
        });
        this.state.callback(data);
    };

    open = (options = {  // options 作為對象必須給定默認值
        props: {},
        component: null,
        callback: () => {}
    }
    ) => {
        const _key = new Date().getTime();  // 定義key為當下時間戳 > key改變 > 子組件重新渲染
        const { props, component, callback } = options;  // component 為構造函數
        const _component = React.createElement(component, {
            ...props,  // props作為component屬性 > 將數據傳回Product.js
            close: this.close, key: _key 
        });  // React.createElement() 將構造函數轉為組件型態 ({ } 傳參)
        this.setState({
            active: true,
            component: _component,
            callback: callback
        })
    };
    
    render() {

        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        };

        return (
            <div className={_class[this.state.active]}>
                <div className="over-layer" onClick={() => {this.close()}}></div>
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={() => {this.close()}}>x</span>
                        {this.state.component}
                    </div>
                </div>
            </div>
        )
    }
};

const _div = document.createElement('div');  // 自定義 _div 為 <div>
document.body.appendChild(_div);

const _panel = render(<Panel />, _div);  // 把 <Panel /> 放入自定義的 <div> 裡

export default _panel;