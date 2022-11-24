import React from 'react';
import { useContext } from 'react';
import AuthApi from '../utils/AuthApi';
import { signOut } from '../services/AuthService';

const Home = () => {
    const authApi = useContext(AuthApi);
    
    const handleLogout = async () => {
       const res = await signOut();
       authApi.setAuth(res.data.auth);
    }

    return (
       <div></div>
    )
}

export default Home;