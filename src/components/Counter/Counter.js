import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
