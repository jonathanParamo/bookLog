import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import userBookReducer from './slices/userBookSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    userBooks: userBookReducer,
  },
});

export default store;

