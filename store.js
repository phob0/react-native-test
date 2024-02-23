import {configureStore} from '@reduxjs/toolkit';
import books from './slice/crudSlice';

let reducer = {
  books,
};

const store = configureStore({
  reducer,
});

export default store;
