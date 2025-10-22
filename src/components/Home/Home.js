import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <section style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Welcome to React Practice</h1>
        <p style={{ color: '#555', marginBottom: 20 }}>
          Learn, build, and practice with simple examples: students, posts, counter, and more.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/student/list"><button style={{ padding: '10px 16px' }}>View Students</button></Link>
          <Link to="/posts"><button style={{ padding: '10px 16px' }}>View Posts</button></Link>
          <Link to="/counter"><button style={{ padding: '10px 16px' }}>Try Counter</button></Link>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Student Manager</h3>
          <p style={{ margin: 0 }}>Add, edit, and manage students in a simple UI.</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Protected Routes</h3>
          <p style={{ margin: 0 }}>Login to access dashboard, students, posts, and counter.</p>
        </div>
        <div style={{ padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
          <h3 style={{ marginTop: 0 }}>Redux Examples</h3>
          <p style={{ margin: 0 }}>State management for students and the counter.</p>
        </div>
      </section>
    </div>
  );
}
