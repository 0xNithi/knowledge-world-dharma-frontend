import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setAccessToken } from './AuthReducer';

export function useAuth() {
  const dispatch = useDispatch();
  const UserState = useSelector((state) => state.user);
  function SetAccessToken(data) {
    dispatch(setAccessToken(data));
  }
  function loginAuth(data) {
    dispatch(login(data));
  }
  function logoutAuth() {
    dispatch(logout());
  }
  function getUser() {
    return UserState;
  }
  return {
    SetAccessToken,
    getUser,
    loginAuth,
    logoutAuth,
  };
}
