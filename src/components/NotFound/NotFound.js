import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 16 }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ marginBottom: 8 }}>404 - Page Not Found</h1>
        <p style={{ color: '#666', marginBottom: 16 }}>The page you are looking for doesn’t exist.</p>
        <Link to="/"><button style={{ padding: '8px 14px' }}>Go Home</button></Link>
      </div>
    </div>
  );
}
