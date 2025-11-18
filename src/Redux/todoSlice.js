import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

// Create entity adapter for todos
const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

// Initial state using the entity adapter
const initialState = todosAdapter.getInitialState({
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filter: 'all' // 'all' | 'active' | 'completed'
});

// Mock API functions
const fakeApi = {
  fetchTodos: () => 
    new Promise((resolve) => 
      setTimeout(() => resolve([
        { id: '1', text: 'Learn Redux Toolkit', completed: true, date: new Date().toISOString() },
        { id: '2', text: 'Build an app', completed: false, date: new Date().toISOString() }
      ]), 500)
    ),
  
  saveTodo: (todo) => 
    new Promise((resolve) => 
      setTimeout(() => resolve({
        ...todo,
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString()
      }), 300)
    ),
    
  toggleTodo: (todo) => 
    new Promise((resolve) => 
      setTimeout(() => resolve({
        ...todo,
        completed: !todo.completed
      }), 300)
    ),
    
  deleteTodo: (id) => 
    new Promise((resolve) => 
      setTimeout(() => resolve(id), 300)
    )
};

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fakeApi.fetchTodos();
  return response;
});

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (text) => {
    const response = await fakeApi.saveTodo({ text, completed: false });
    return response;
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (todo) => {
    const response = await fakeApi.toggleTodo(todo);
    return response;
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    await fakeApi.deleteTodo(id);
    return id;
  }
);

// Create the slice
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Regular reducer for client-side filtering
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    // Clear completed todos
    clearCompleted: (state) => {
      const completedIds = Object.values(state.entities)
        .filter(todo => todo.completed)
        .map(todo => todo.id);
      todosAdapter.removeMany(state, completedIds);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add new todo
      .addCase(addNewTodo.fulfilled, todosAdapter.addOne)
      // Toggle todo
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const { id, ...changes } = action.payload;
        todosAdapter.updateOne(state, {
          id,
          changes
        });
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        todosAdapter.removeOne(state, action.payload);
      });
  }
});

// Export the generated action creators
export const { setFilter, clearCompleted } = todosSlice.actions;

// Export the selectors
export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
  selectIds: selectTodoIds
} = todosAdapter.getSelectors(state => state.todos);

// Create memoized selectors
export const selectFilter = state => state.todos.filter;

export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos, filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
);

export const selectTodoStats = createSelector(
  [selectAllTodos],
  (todos) => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }
);

export default todosSlice.reducer;
