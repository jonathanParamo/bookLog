import { signupApi, signinApi, returnBookApi } from '../../api/bookApi';
import { isLoading, setAddUser } from './userSlice';
import { setReservedBooks, setReservedBooksInfo, setReturnBook, startLoading } from './userBookSlice';
import axios from 'axios';

export const createUser = ({ email, password, username }) => {
  return async (dispatch, getState) => {
    dispatch(isLoading());
    try {
      const response = await signupApi.post('/signup', {
        username,
        email,
        password,
      });
      dispatch(setAddUser({ user: response.data.user, isLoading: false }));
      return response;
    } catch (error) {
      dispatch(isLoading());
    }
  };
};

export const enterUser = ({ email = '', password, username = '' }) => {
  return async (dispatch, getState) => {
    dispatch(isLoading());
    try {
      const response = await signinApi.post('/signin', {
        username,
        email,
        password,
      });
      const { user } = response.data.userData;
      const reservedBooks = user.reserved_books

      dispatch(setAddUser({ user, isLoading: false }));
      dispatch(setReservedBooksInfo({ reservedBooks: reservedBooks, isLoading: false }));

      return response;
    } catch (error) {
      dispatch(isLoading());
      return error
    }
  };
};


export const returnBook = ({ user_id, book_id, token }) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    try {
      const response = await returnBookApi.post(`/books/${book_id}/return/${user_id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if(response.status === 200) {
        dispatch(setReturnBook({ bookId: book_id, startLoading: false }));
      }

      dispatch(startLoading());
      return response;
    } catch (error) {
      dispatch(startLoading());
      return
    }
  };
};


export const loadUserData = (userId) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    const response = await axios.get(`/api/user/${userId}/reserved-books`)

    try {
      const { reservedBooks } = response.data;

      dispatch(setReservedBooks({ reservedBooks }));
    } catch (error) {
      dispatch(startLoading());
    }
  };
};
