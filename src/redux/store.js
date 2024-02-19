import userReducer from './slices/userSlice';
import userBookReducer from './slices/userBookSlice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    user: userReducer,
    userBooks: userBookReducer,
  },
});

export default store;

