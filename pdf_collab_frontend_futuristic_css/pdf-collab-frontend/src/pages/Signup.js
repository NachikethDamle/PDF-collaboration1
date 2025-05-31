import React, { useState } from 'react';
import axios from 'axios';

function Signup({ switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 3) {
      setError('Password must be at least 3 characters long.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE}/api/auth/signup`, { name, email, password });
      alert('Signup successful! Please log in.');
      switchToLogin();
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      <button className="link-button" onClick={switchToLogin}>Already have an account? Log in</button>
    </div>
  );
}

export default Signup;
