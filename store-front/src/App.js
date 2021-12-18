import React from 'react';
// import {Provider} from 'react-redux';
//import {createStore } from 'redux';
//import rootReducer from './reducers';

import {Routes, Route } from 'react-router-dom';

import './App.css';
import Home from "./pages/Home/Home";
// import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Auth/login"
import Register from "./pages/Auth/register"
import Cart from "./pages/ShopingCart/cart"
import Checkout from "./pages/ShopingCart/checkout"
import ProductDetails from "./pages/ProductDetails/index"
// import ProductDetail from "./pages/ProductDetail/ProductDetail";
// import ShoppingCart from "./pages/ShopingCart/ShoppingCart";


//export const  store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => {
    return (
      <React.Fragment>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route path="cart" element={<Cart />}/>
                <Route path="checkout" element={<Checkout />}/>
                <Route path="product-details/:id" element={<ProductDetails />} />
            </Routes>
          <Footer/>
      </React.Fragment>
    )
}

export default App;
