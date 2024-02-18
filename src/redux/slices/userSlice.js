import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: "",
      email: "",
      profile_image: "",
      user_id: null,
    },
    isLoading: false,
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    setAddUser: (state, action) => {
      const { user, isLoading } = action.payload;
      state.user = user;
      state.isLoading = isLoading;
    },
  }
});
export const { setAddUser, startLoading } = userSlice.actions;

export default userSlice.reducer;