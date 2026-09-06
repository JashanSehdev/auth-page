import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './pages/signup/signup.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login.page';
import PrivateRoute from './Routing/privateRoute';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home.page'
import Wishlist from './pages/wishlist/wishlist.page';
import Cart from './pages/cart/cart.page';

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
          </Route>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;
