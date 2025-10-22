import React from 'react';
import { connect } from 'react-redux';

// mapStateToProps: selects data from the store and maps it to props
const mapStateToProps = (state) => ({
  count: state.counter.count,
});

// mapDispatchToProps: creates callbacks that dispatch actions
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' }),
});

function CounterConnected({ count, increment, decrement }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Connected Counter (connect API)</h1>
      <h2>{count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CounterConnected);
