import { signupApi, signinApi } from "../../api/bookApi";
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
      dispatch(setAddUserInfo({ user: response.data.userData.user, isLoading: false }))
      return response
    }  catch (error) {
      dispatch(startLoading({ isLoading: false }))
    }
  }
}