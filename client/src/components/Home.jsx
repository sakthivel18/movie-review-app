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
        <div>
            <h1>This is home component</h1>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Home;