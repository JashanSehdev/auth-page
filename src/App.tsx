import React from 'react';
import './App.css';
import Signup from './pages/signup/signup.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login.page';
import PrivateRoute from './Routing/privateRoute';
import Navbar from './components/navbar/navbar';
import Home from './pages/home/home.page'
import Wishlist from './pages/wishlist/wishlist.page';
import Cart from './pages/cart/cart.page';
import ProductPage from './pages/product/product.page';
import Profile from './pages/profile/profile.page';

function App() {
  return (
  
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route element={<PrivateRoute />} >
            <Route path={"/dashboard"} element={<Dashboard/>} />
            <Route path={"/"} element={<Home/>} />
            <Route path={"/wishlist"} element={<Wishlist/>} />
            <Route path={"/cart"} element={<Cart/>} />
            <Route path={"/product"} element={<ProductPage/>} />
            <Route path={"/profile"} element={<Profile/>} />
          </Route>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;
