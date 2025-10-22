import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) {
      alert('Please enter a valid email address.');
      return;
    }
    localStorage.setItem('loggedIn', 'true');
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 360, padding: 24, border: '1px solid #ddd', borderRadius: 8 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 16 }}>Login Page</h1>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" style={{ padding: '10px 16px' }}>Log In</button>
        </form>
      </div>
    </div>
  );
}
