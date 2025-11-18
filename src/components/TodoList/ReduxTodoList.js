import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  addNewTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  clearCompleted,
  selectFilteredTodos,
  selectTodoStats,
  selectFilter
} from '../../Redux/todoSlice';

const ReduxTodoList = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  
  // Select data from Redux store
  const todos = useSelector(selectFilteredTodos);
  const { total, completed, active } = useSelector(selectTodoStats);
  const currentFilter = useSelector(selectFilter);
  const status = useSelector(state => state.todos.status);
  const error = useSelector(state => state.todos.error);

  // Fetch todos on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  const handleToggle = (todo) => {
    dispatch(toggleTodo(todo));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  // Loading and error states
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Redux Todo List</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={handleSubmit} className="mb-4 flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add
        </button>
      </form>

      {/* Todo List */}
      <div className="mb-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center p-2 border-b hover:bg-gray-50"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo)}
              className="mr-2 h-5 w-5 text-blue-600 rounded"
            />
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>{active} items left</div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-2 py-1 rounded ${currentFilter === 'all' ? 'border border-blue-500' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange('active')}
            className={`px-2 py-1 rounded ${currentFilter === 'active' ? 'border border-blue-500' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => handleFilterChange('completed')}
            className={`px-2 py-1 rounded ${currentFilter === 'completed' ? 'border border-blue-500' : ''}`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={handleClearCompleted}
          className="hover:underline"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
};

export default ReduxTodoList;
