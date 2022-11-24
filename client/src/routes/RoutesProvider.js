import React, { useContext } from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import AuthApi from '../utils/AuthApi';
import CreateMovie from '../components/CreateMovie';

const RoutesProvider = () => {
  const authApi = useContext(AuthApi);
    return (
        <Routes>
          <Route exact path="/login" element={ !authApi.auth ? <Login/> : <Navigate to="/" replace/> }/>
          <Route exact path="/signup"element={ !authApi.auth ? <Signup/> : <Navigate to="/" replace/> }/>
          <Route exact path="/create" element={ <CreateMovie/> } />
          <Route exact path="/" element={ authApi.auth ? <Home/> : <Navigate to="/login" replace /> } />
        </Routes>
    );

}

export default RoutesProvider;

