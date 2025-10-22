import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../studentReducer/StudentReducer";
import postReducer from "../postReducer/postReducer";
import counterReducer from "../CounterReducer/CounterReducer";
import todoReducer from "../todoReducer/todoReducer";
import createSagaMiddleware from "redux-saga";
import logger from "../middleware/logger";
import rootSaga from "../sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    student: studentReducer,
    post: postReducer,
    counter: counterReducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
