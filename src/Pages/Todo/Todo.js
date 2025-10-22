import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadTodos } from '../../Redux/TodoActions/todoActions';

export default function Todo() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.todo.items);
  const filter = useSelector((s) => s.todo.filter);
  const loading = useSelector((s) => s.todo.loading);
  const error = useSelector((s) => s.todo.error);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const filtered = useMemo(() => {
    if (filter === 'completed') return items.filter((t) => t.completed);
    if (filter === 'active') return items.filter((t) => !t.completed);
    return items;
  }, [items, filter]);

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch({ type: 'ADD_TODO', payload: text });
    setText('');
  };

  const beginEdit = (id, currentText) => {
    setEditingId(id);
    setEditingText(currentText);
  };

  const saveEdit = () => {
    if (!editingText.trim()) return;
    dispatch({ type: 'EDIT_TODO', payload: { id: editingId, text: editingText } });
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', padding: 16 }}>
      <h1>Todos</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a todo"
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => dispatch(loadTodos())}>Load via Thunk</button>
        <button onClick={() => dispatch({ type: 'LOAD_TODOS_SAGA' })}>Load via Saga</button>
      </div>

      {loading && <p>Loading todos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => dispatch({ type: 'SET_TODO_FILTER', payload: 'all' })} disabled={filter === 'all'}>
          All
        </button>
        <button onClick={() => dispatch({ type: 'SET_TODO_FILTER', payload: 'active' })} disabled={filter === 'active'}>
          Active
        </button>
        <button onClick={() => dispatch({ type: 'SET_TODO_FILTER', payload: 'completed' })} disabled={filter === 'completed'}>
          Completed
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={t.completed} onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: t.id })} />

            {editingId === t.id ? (
              <>
                <input value={editingText} onChange={(e) => setEditingText(e.target.value)} style={{ flex: 1 }} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <span style={{ flex: 1, textDecoration: t.completed ? 'line-through' : 'none' }}>{t.text}</span>
                <button onClick={() => beginEdit(t.id, t.text)}>Edit</button>
                <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: t.id })} style={{ color: 'red' }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
