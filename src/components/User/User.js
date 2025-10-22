import { Link } from 'react-router-dom';
import React from 'react';

export default function User() {
  const users = ['alice', 'bob', 'charlie'];

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user}>
            <Link to={`/user/${user}`}>{user}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
