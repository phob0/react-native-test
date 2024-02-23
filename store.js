import {configureStore} from '@reduxjs/toolkit';
import quotes from './slice/crudSlice';

let reducer = {
  quotes,
};

const store = configureStore({
  reducer,
});

export default store;
