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
            </Routes>
          <Footer/>
      </React.Fragment>
    )
}

export default App;
