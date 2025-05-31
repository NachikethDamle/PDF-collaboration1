import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/login`, { email, password });
    setToken(res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button className="link-button" onClick={switchToSignup}>Don't have an account? Sign up</button>
    </div>
  );
}

export default Login;