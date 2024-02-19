import { signupApi, signinApi, returnBookApi, getBooksApi } from "../../api/bookApi";
import { setAddUserInfo } from "./userBookSlice";
import { startLoading, setAddUser } from "./userSlice";

export const createUser = ({ email, password, username }) => {
  return async( dispatch, getState ) => {
    dispatch( startLoading() );
    try {
      const response = await signupApi.post('/signup', {
        username,
        email,
        password,
      });
      dispatch(setAddUser({ user: response.data.user, isLoading: false }))
      return response
    }  catch (error) {
      dispatch(startLoading({ isLoading: false }))
    }
  };
};

export const enterUser = ({ email = '', password, username = '' }) => {
  return async( dispatch, getState ) => {
    dispatch( startLoading() );
    try {
      const response = await signinApi.post('/signin', {
        username,
        email,
        password,
      });
      const { user } = response.data.userData;
      dispatch(setAddUserInfo({ user: user , isLoading: false }));
      return response
    }  catch (error) {
      dispatch(startLoading({ isLoading: false }))
    }
  }
}

export const returnBook = ({ user_id, book_id, token }) => {
  console.log(token);
  return async (dispatch, getState) => {
    dispatch(startLoading());
    try {
      // Utilizar los parámetros userId y book_id en la llamada a la API
      const response = await returnBookApi.post(`/books/${book_id}/return/${user_id}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const { user } = response.data.userData;
      console.log(user, "user");
      dispatch(setAddUserInfo({ user: user , isLoading: false }));

      dispatch(startLoading());
      return response;
    } catch (error) {
      console.error('Error al devolver el libro:', error);
      dispatch(startLoading());
      // Puedes manejar el error según tus necesidades
    }
  };
};
