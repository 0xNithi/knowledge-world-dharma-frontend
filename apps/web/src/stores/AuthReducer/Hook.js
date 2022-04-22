import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './AuthReducer';

export function useAuth() {
  const dispatch = useDispatch();
  const UserState = useSelector((state) => state.user);
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
    getUser,
    loginAuth,
    logoutAuth,
  };
}
