import { call, put, takeLatest } from 'redux-saga/effects';

function fetchTodosApi() {
  return fetch('https://jsonplaceholder.typicode.com/todos?_limit=5').then((r) => r.json());
}

function* loadTodosSaga() {
  try {
    yield put({ type: 'LOAD_TODOS_REQUEST' });
    const data = yield call(fetchTodosApi);
    const mapped = data.map((d) => ({ id: d.id, text: d.title, completed: d.completed }));
    yield put({ type: 'LOAD_TODOS_SUCCESS', payload: mapped });
  } catch (err) {
    yield put({ type: 'LOAD_TODOS_FAILURE', payload: String(err) });
  }
}

export default function* todoSaga() {
  yield takeLatest('LOAD_TODOS_SAGA', loadTodosSaga);
}
