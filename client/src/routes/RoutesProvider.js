import React, { useContext } from 'react';
import {Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AuthApi from '../utils/AuthApi';

const RoutesProvider = () => {
  const authApi = useContext(AuthApi);
    return (
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/" element={ authApi.auth ? <Home/> : <Login/> } />
        </Routes>
    );

}

export default RoutesProvider;

