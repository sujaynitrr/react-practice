import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('loggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  return (
    <>
      <nav style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/user">Users</NavLink>
          {isLoggedIn && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/counter">Counter</NavLink>
              <NavLink to="/counter-connected">Counter (Connected)</NavLink>
              <NavLink to="/posts">Posts</NavLink>
              <NavLink to="/todos">Todos</NavLink>
              <NavLink to="/student/add">Students (Add)</NavLink>
              <NavLink to="/student/list">Students (List)</NavLink>
              <NavLink to="/todoList">TodoList</NavLink>
              <NavLink to="/reducer">Reducer</NavLink>
              <NavLink to="/stopWatch">StopWatch</NavLink>
            </>
          )}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {!isLoggedIn ? (
            <NavLink to="/login">Login</NavLink>
          ) : (
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
          )}
        </div>
      </nav>
      <hr />
      <Outlet />
    </>
  );
};

export default Layout;
