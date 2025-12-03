import React, { createContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout//Layout.js';
import Home from './components/Home/Home.js';
import About from './components/About/About.js';
import Contact from './components/Contact/Contact.js';
import User from './components/User/User.js';
import UserDetails from './components/UserDeatils/UserDetails.js';
import NotFound from './components/NotFound/NotFound.js';
import Login from './components/Login/Login.js';
import PrivateRoute from './Routes/PrivateRoute';
import Counter from "./components/Counter/Counter.js";
import CounterConnected from "./components/CounterConnected/CounterConnected.js";
import Post from "./Pages/Post/Post.js"
import {Student} from "./Pages/Student/Student.js"
import StudentList from "./Pages/Student/StudentList.js";
import Todo from "./Pages/Todo/Todo.js";
import TodoList from './components/TodoList/TodoList.js';
import Reducer from './components/Reducer/Reducer.js';
import StopWatch from './components/StopWatch/StopWatch.js';
import UserList from './components/UserList/UserList.js';

export default function App() {

  const myContext =createContext();
  const [user,setUser]=useState("Hello");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="todoList" element={<TodoList/>}/>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />  
        <Route path="user" element={<User />} />
        <Route path="user/:id" element={<UserDetails />} /> 
        <Route path="dashboard" element={<PrivateRoute><h1>Dashboard Page</h1></PrivateRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="/counter" element={<PrivateRoute><Counter /></PrivateRoute>} />
        <Route path="/counter-connected" element={<PrivateRoute><CounterConnected /></PrivateRoute>} />
        <Route path="/posts" element={<PrivateRoute><Post/></PrivateRoute>}/>
        <Route path="/todos" element={<PrivateRoute><Todo/></PrivateRoute>} />
        <Route path="/student" element={<Navigate to="/student/add" replace />} />
        <Route path="/student/add" element={<PrivateRoute><Student/></PrivateRoute>} />
        <Route path="/student/add/:id" element={<PrivateRoute><Student/></PrivateRoute>} />
        <Route path="/student/list" element={<PrivateRoute><StudentList/></PrivateRoute>} />
        <Route path="/reducer" element={<Reducer/>}/>
        <Route path="/stopWatch" element={<StopWatch/>}></Route>
        <Route path='/userData' element={<UserList/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
