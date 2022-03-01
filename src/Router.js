import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from 'pages/App';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Cart from 'pages/Cart';
import NotFound from 'pages/NotFound';
import NowState from 'pages/NowState';
import ClassLogin from 'pages/ClassLogin';


const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<App />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/cart" exact element={<Cart />} />
            <Route path="/nowstate" exact element={<NowState />} />
            <Route path="/class-login" exact element={<ClassLogin />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default Router;

