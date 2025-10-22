import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../studentReducer/StudentReducer";
import postReducer from "../postReducer/postReducer";
import counterReducer from "../CounterReducer/CounterReducer";
import todoReducer from "../todoReducer/todoReducer";

const store = configureStore({
  reducer: {
    student: studentReducer,
    post: postReducer,
    counter: counterReducer,
    todo: todoReducer,
  },
});

export default store;
