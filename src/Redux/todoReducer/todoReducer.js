const initialState = {
  items: [], // {id, text, completed}
  filter: 'all', // 'all' | 'completed' | 'active'
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const newItem = {
        id: Math.random(),
        text: action.payload.trim(),
        completed: false,
      };
      if (!newItem.text) return state;
      return { ...state, items: [newItem, ...state.items] };
    }
    case 'EDIT_TODO': {
      const { id, text } = action.payload;
      return {
        ...state,
        items: state.items.map((t) => (t.id === id ? { ...t, text } : t)),
      };
    }
    case 'TOGGLE_TODO': {
      const id = action.payload;
      return {
        ...state,
        items: state.items.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
      };
    }
    case 'DELETE_TODO': {
      const id = action.payload;
      return { ...state, items: state.items.filter((t) => t.id !== id) };
    }
    case 'SET_TODO_FILTER': {
      return { ...state, filter: action.payload };
    }
    default:
      return state;
  }
}
