import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './UserDataSlice';

export const store = configureStore({
  reducer: {
    UserData:counterSlice ,
  },
});
