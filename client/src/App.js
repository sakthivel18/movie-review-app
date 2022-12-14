import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthApi from './utils/AuthApi';
import RoutesProvider from './routes/RoutesProvider';
import { useEffect } from 'react';
import { hasLoggedIn } from './services/AuthService'
import Navbar from './components/Navbar';

function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const readSession = async () => {
      const res = await hasLoggedIn();
      if (res.data.auth) {
        setAuth(true);
      }
    }
    readSession();
  }, [])
  return (
    <div>
      <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
          <Navbar/>
          <div className="page-container">
            <RoutesProvider />
          </div>
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
