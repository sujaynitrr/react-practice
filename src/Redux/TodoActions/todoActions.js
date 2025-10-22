// Thunk examples for async side-effects using redux-thunk
// Requires thunk middleware (already included by RTK's configureStore by default)

export const loadTodos = () => async (dispatch) => {
  try {
    dispatch({ type: 'LOAD_TODOS_REQUEST' });
    // Fake async: fetch from JSONPlaceholder and map to our shape
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await res.json();
    const mapped = data.map((d) => ({ id: d.id, text: d.title, completed: d.completed }));
    dispatch({ type: 'LOAD_TODOS_SUCCESS', payload: mapped });
  } catch (err) {
    dispatch({ type: 'LOAD_TODOS_FAILURE', payload: String(err) });
  }
};
