import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  initialize as initializeAction,
  logout as logoutAction,
  fetchLogin,
  fetchRegister,
  fetchUser,
} from '.';

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUser({ accessToken }));
    }
  }, [accessToken, dispatch]);

  return { user };
};

export const useUser = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isLoading, error } = useSelector(
    (state) => state.user,
  );

  const handleRegister = useCallback(
    ({ data }) => {
      dispatch(fetchRegister({ data }));
    },
    [dispatch],
  );

  const handleLogin = useCallback(
    ({ data }) => {
      dispatch(fetchLogin({ data }));
    },
    [dispatch],
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAction());
  }, [dispatch]);

  return {
    user,
    accessToken,
    isLoading,
    error,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
