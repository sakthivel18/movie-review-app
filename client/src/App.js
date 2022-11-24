import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthApi from './utils/AuthApi';
import RoutesProvider from './routes/RoutesProvider';

function App() {
  const [auth, setAuth] = useState(false);
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
