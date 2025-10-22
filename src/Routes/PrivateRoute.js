import { Navigate } from 'react-router-dom';
import React from 'react';

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return isLoggedIn ? children : <Navigate to="/login" />;
}
