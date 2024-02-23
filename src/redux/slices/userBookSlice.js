import { createSlice } from '@reduxjs/toolkit';

export const userBooksSlice = createSlice({
  name: 'userBooks',
  initialState: {
    reservedBooks: [],
    isLoading: false,
    returnBook: null,
    availableBooks: [],
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    setReservedBooks: (state, action) => {
      const { reservedBooks } = action.payload;
      state.reservedBooks = reservedBooks;
      state.availableBooks = state.availableBooks.filter(
        (availableBook) => !reservedBooks.some(reservedBook => reservedBook.book_id === availableBook.book_id)
      );
      state.isLoading = false;
    },
    setReturnBook: (state, action) => {
      const { bookId } = action.payload;
      state.returnBook = bookId;
      state.reservedBooks = state.reservedBooks.filter((book) => book.book_id !== bookId);
      state.isLoading = false;
    },
    setAvailableBooks: (state, action) => {
      const { availableBooks } = action.payload;
      state.availableBooks = availableBooks;
      state.isLoading = false;
    },
  },
});

export const { startLoading, setReservedBooks, setReturnBook, setAvailableBooks } = userBooksSlice.actions;

export default userBooksSlice.reducer;
