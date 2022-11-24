import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthApi from './utils/AuthApi';
import RoutesProvider from './routes/RoutesProvider';
import { useEffect } from 'react';
import { hasLoggedIn } from './services/AuthService'

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
    <div className="App">
      <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
          <RoutesProvider />
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

export default App;
