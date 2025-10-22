import React from 'react';

export default function Contact() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0, marginBottom: 8 }}>Contact Us</h1>
      <p style={{ color: '#555', marginTop: 0, marginBottom: 16 }}>
        Have questions or feedback? We'd love to hear from you.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Email</h3>
          <p style={{ margin: 0 }}>support@example.com</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Office</h3>
          <p style={{ margin: 0 }}>123 React Street, JS City</p>
        </div>
      </div>
    </div>
  );
}
