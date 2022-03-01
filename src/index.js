import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'Router';
import { ToastContainer } from 'react-toastify';  // 全局渲染 (放在index) 一次 react-toastify 的所有內容
import 'react-toastify/dist/ReactToastify.css';
import 'css/app.scss';
import 'css/style.scss';

import 'commons/auth';


ReactDOM.render(
    <div>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
        />
        <Router />
    </div>,
    document.getElementById('root')
);

