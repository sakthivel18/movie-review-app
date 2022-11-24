import React from 'react';
import { useContext } from 'react';
import AuthApi from '../utils/AuthApi';

const Home = () => {
    const authApi = useContext(AuthApi);
    
    const handleLogout = () => {
        authApi.setAuth(false);
    }

    return (
        <div>
            <h1>This is home component</h1>
            <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Home;