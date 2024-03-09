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
    setReservedBooksInfo: (state, action) => {
      const { reservedBooks } = action.payload;
      state.reservedBooks = reservedBooks;
      state.isLoading = false;
    },
    setReservedBooks: (state, action) => {
      const { reservedBooks } = action.payload;
      state.reservedBooks = [...state.reservedBooks, ...reservedBooks]
      state.availableBooks = state.availableBooks.filter((book) =>
        !reservedBooks.some((reservedBook) => reservedBook.book_id === book.book_id)
      );

      state.isLoading = false;
    },
    setReturnBook: (state, action) => {
      const { bookId } = action.payload;
      const returnedBook = state.reservedBooks.find((book) => book.book_id === bookId);
      if (returnedBook) {
        state.reservedBooks = state.reservedBooks.filter((book) => book.book_id !== bookId);
        state.availableBooks = [...state.availableBooks, returnedBook];
      }
      state.isLoading = false;
    },
    setAvailableBooks: (state, action) => {
      const { availableBooks } = action.payload;
      state.availableBooks = availableBooks;
      state.isLoading = false;
    },
    setCreateBook: (state, action) => {
      const { availableBooks } = action.payload;
      state.availableBooks = [...state.availableBooks, ...availableBooks];
      state.isLoading = false;
    }
  },
});

export const { startLoading, setReservedBooks, setReturnBook, setAvailableBooks, setReservedBooksInfo, setCreateBook } = userBooksSlice.actions;

export default userBooksSlice.reducer;
