import React from 'react';

export default function About() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0, marginBottom: 8 }}>About This Project</h1>
      <p style={{ color: '#555', marginTop: 0, marginBottom: 16 }}>
        This is a lightweight React practice app demonstrating routing, protected pages, Redux state,
        and basic CRUD for a students list. It uses simple inline styles to keep setup minimal.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Routing</h3>
          <p style={{ margin: 0 }}>Client-side navigation with public and private routes.</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>State</h3>
          <p style={{ margin: 0 }}>Redux for students list and a simple counter example.</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Auth Demo</h3>
          <p style={{ margin: 0 }}>Very simple localStorage-based login to protect routes.</p>
        </div>
      </div>
    </div>
  );
}
