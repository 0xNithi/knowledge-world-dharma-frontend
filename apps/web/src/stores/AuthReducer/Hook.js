import { useDispatch, useSelector } from 'react-redux';
import { login, logout, setAccessToken, setNewUser } from './AuthReducer';

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
  function SetNewUser(data) {
    dispatch(setNewUser(data));
  }
  return {
    SetNewUser,
    SetAccessToken,
    getUser,
    loginAuth,
    logoutAuth,
  };
}
