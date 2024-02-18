import { createSlice } from '@reduxjs/toolkit';

export const userBooksSlice = createSlice({
  name: 'userBooks',
  initialState: {
    userSignin: {
      user_id: null,
      username: "",
      email: "",
      profile_image: "",
      reserved_book_title: "",
      reserved_book_author: "",
    },
    isLoading: false,
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    setAddUserInfo: (state, action) => {
      const { user } = action.payload;
      state.userSignin = user;
    }
  }
});

export const { setAddUserInfo } = userBooksSlice.actions;

export default userBooksSlice.reducer;
