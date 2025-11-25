import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  async function dataValue() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const dataValue = await response.json(); // FIXED
    setData(dataValue);
  }

  useEffect(() => {
    dataValue();
  }, []);

  useEffect(() => {
    console.log("Fetched Data:", data); // will log after state updates
  }, [data]); // runs only when data changes

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Redux Counter</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
