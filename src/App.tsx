import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './pages/signup/signup.page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard';
import Login from './pages/login/login.page';
import PrivateRoute from './Routing/privateRoute';
import Navbar from './components/navbar/navbar';

function App() {
  return (
  
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route element={<PrivateRoute />} >
            <Route path={"/"} element={<Dashboard/>} />
          </Route>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Signup />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;
