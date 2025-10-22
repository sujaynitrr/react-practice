// Simple synchronous logger middleware
const logger = (store) => (next) => (action) => {
  // eslint-disable-next-line no-console
  console.log('%cDispatching', 'color: #0b7285', action);
  const result = next(action);
  // eslint-disable-next-line no-console
  console.log('%cNext state', 'color: #1864ab', store.getState());
  return result;
};

export default logger;
