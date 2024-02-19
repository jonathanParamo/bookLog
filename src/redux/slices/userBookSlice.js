import { createSlice } from '@reduxjs/toolkit';

export const userBooksSlice = createSlice({
  name: 'userBooks',
  initialState: {
    userSignin: {
      user_id: null,
      username: "",
      email: "",
      profile_image: "",
      reserved_books: [],
    },
    isLoading: false,
    returnBook: [],
    getBooks: [],
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    setAddUserInfo: (state, action) => {
      const { user } = action.payload;
      state.userSignin = user;
    },
    returnBook: (state, action) => {
      // Actualiza el estado según la acción de devolver el libro
      const { bookId } = action.payload;
      state.returnBook = bookId
      state.userSignin.reserved_books = state.userSignin.reserved_books.filter(book => book.book_id !== bookId);
    },
    getBooks: (state, action) => {
      const { books } = action.payload;
      state.getBooks = books;
    },
  },
});

export const { setAddUserInfo, returnBook, getBooks } = userBooksSlice.actions;

export default userBooksSlice.reducer;
