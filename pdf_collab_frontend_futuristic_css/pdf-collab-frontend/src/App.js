import React, { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isSignup, setIsSignup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return isSignup
      ? <Signup switchToLogin={() => setIsSignup(false)} />
      : <Login setToken={setToken} switchToSignup={() => setIsSignup(true)} />;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>PDF Collaboration Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Dashboard token={token} />
    </div>
  );
}

export default App;